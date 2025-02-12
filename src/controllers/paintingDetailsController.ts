import { NextFunction, Request, Response } from "express";
import { PaintingService } from "../services/paintingService";
import { DonationService } from "../services/donationServices";
export const getPaintingDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const painting_id = parseInt(req.params.painting_id);

    if (isNaN(painting_id)) {
      res.status(400).json({
        message: "invalid id is provided",
      });
      return;
    }
    //getting the painting details
    const painting = await PaintingService.getPainting(painting_id);

    //handle empty response
    if (!painting) {
      res.status(400).json({
        message: "no painting found for this id",
      });
      return;
    }
    //handle the artists
    //send the required res
    res.status(200).json(painting);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err.message,
    });
  }
};

export const donationInfoByPainting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const painting_id = parseInt(req.params.painting_id);

    if (isNaN(painting_id)) {
      res.status(400).json({
        message: "invalid id is provided",
      });
      return;
    }
    const paintingdonationsinfo =
      await DonationService.getDonationByPaintingService(
        parseInt(req.params.painting_id)
      );

    res.status(200).json(paintingdonationsinfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "database error",
    });
  }
};
