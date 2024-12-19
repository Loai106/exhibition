import { Request, Response, NextFunction } from "express";
import { PaintingService } from "../services/paintingService";

const getAllPaintings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paintings = await PaintingService.getAllPaintings();

    if (!paintings) {
      throw new Error("no paintings found");
    }

    res.status(200).send(paintings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
