import { Request, Response } from "express";
import {
  OrdersController,
  Client,
  Environment,
  PaymentsController,
} from "@paypal/paypal-server-sdk";
import dotenv from "dotenv";
import { validateData } from "../utils/dataValidation";
import { Donation } from "../models/DonationModel";
import { DonationService } from "../services/donationServices";
import { sequelize } from "../config/db";
dotenv.config();

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_CLIENT_ID as string,
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET as string,
  },
  timeout: 0,
  environment:
    process.env.NODE_ENV === "production"
      ? Environment.Production
      : Environment.Sandbox,
});
const ordersController = new OrdersController(client);
const paymentController = new PaymentsController(client);

//TODO

export const createOrder = async (req: Request, res: Response) => {
  const collect = {
    body: {
      intent: "CAPTURE",
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: req.body.amount,
          },
        },
      ],
    },
    prefer: "return=minimal",
  };

  console.log("body :", req.body);
  const { name, email, amount, painting_id } = req.body;

  const { value, error } = validateData({ name, email, amount });
  if (error) {
    res.status(400).json({
      message: error.message,
    });
    return;
  }
  try {
    // if (!painting_id) {
    //   throw new Error("painting not proivided");
    // }

    const { body, ...httpResponse } = await ordersController.ordersCreate(
      collect as any
    );

    const data = JSON.parse(body as string);
    console.log("balh blah blah:", req.body);

    console.log("balh blah blah:", data);
    console.log("balh blah blah:", httpResponse);

    const donation = await DonationService.addDonation(
      data.id,
      value.name,
      value.email,
      value.amount,
      4
    );
    console.log(body);
    console.log("id in create order:", data.id);
    res.status(httpResponse.statusCode).json(data);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
};

export const captureOrder = async (req: Request, res: Response) => {
  try {
    const result = await sequelize.transaction(async (t: any) => {
      const orderId = req.params.orderId;
      const collect = {
        id: orderId,
        prefer: "return=representation",
      };

      try {
        const { body, ...httpResponse } = await ordersController.ordersCapture(
          collect
        );
        console.log("id in capture  order:", JSON.parse(body as string).id);
        const data = JSON.parse(body as string);
        console.log();
        //update the status
        const dontaionId = JSON.parse(body as string).id;
        console.log("before updating");
        await DonationService.updateStatus(dontaionId);
        console.log("before updating");

        return res.status(httpResponse.statusCode).json(data);
      } catch (error) {
        await t.rollback();
        res.status(400).json({
          message: error.message,
        });
      }
    });
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
};
