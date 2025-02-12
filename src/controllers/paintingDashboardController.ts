import { Request, Response, NextFunction } from "express";
import { validatePaintingData } from "../utils/dataValidation";
import { PaintingService } from "../services/paintingService";

export const addPainting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      painting_name,
      description,
      height,
      width,
      date,
      exhibition_id,
      painting_url,
    } = req.body;

    console.log("body is :", req.body);
    const { value, error } = validatePaintingData({
      painting_name,
      description,
      height,
      width,
      date,
      exhibition_id,
      painting_url,
    });
    if (error) {
      res.status(400).json({
        message: error.message,
      });

      return;
    }
    console.log("value is :", value);
    const painting = await PaintingService.addPainting(value);
    res.status(200).json(painting);
    return;
  } catch (error) {
    console.log(error);
  }
};

export const updatePainting = async (req: Request, res: Response) => {
  try {
    const painting = await PaintingService.updatePainting(req.body || {});
    res.status(painting.status).json(painting.body);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deletePainting = async (req: Request, res: Response) => {
  try {
    const painting_id = req.params.id;
    if (isNaN(parseInt(painting_id))) {
      res
        .status(400)
        .json({ message: "Delete unsuccessful, Please provide a valid id" });
      return;
    }

    const result = await PaintingService.deletePainting(parseInt(painting_id));
    res.status(result.status).json(result.message);
    return;
  } catch (error) {
    res.status(500).json(error.message);
  }
};
