import { Request, Response, NextFunction } from "express";
import { validatePaintingData } from "../utils/dataValidation";

export const addPainting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    painting_name,
    description,
    height,
    width,
    date,
    exhibtion_id,
    painting_url,
  } = req.body;
  const { value, error } = validatePaintingData({
    painting_name,
    description,
    height,
    width,
    date,
    exhibtion_id,
    painting_url,
  });
  if (error) {
    res.status(400).json({
      message: error.message,
    });
    return;
  }
  try {
  } catch (error) {
    console.log(error);
  }
};
