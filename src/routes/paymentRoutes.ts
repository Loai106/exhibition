import express from "express";
import { captureOrder, createOrder } from "../controllers/paymentController";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", createOrder);
paymentRouter.post("/capture-payment/:orderId", captureOrder);

export default paymentRouter;
