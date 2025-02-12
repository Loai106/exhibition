import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];

    if (!header) {
      res.status(401).json({ message: "no auth header provided" });
      return;
    }

    const token = (header as string).replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ message: "no token provided" });
    }
    const verifedToken = Jwt.verify(token, process.env.JWT_SECRET || "");

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
