import { Request, Response, NextFunction } from "express";
import { PaintingService } from "../services/paintingService";

export const getAllPaintings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paintings = await PaintingService.getAllPaintings();

    if (paintings.length === 0) {
      res.status(200).json({
        message: "no painting found",
      });
      return;
    }

    res.status(200).json(paintings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
