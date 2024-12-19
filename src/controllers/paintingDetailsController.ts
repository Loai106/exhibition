import { NextFunction, Request, Response } from "express";
import { PaintingService } from "../services/paintingService";

const getPaintingDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { painting_id } = req.body;
    //getting the painting details
    const painting = await PaintingService.getPainting(painting_id);

    //handle empty response
    if (!painting) {
      throw new Error("no painting found");
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
