import { Request, Response } from "express";
import AdminService from "../services/adminService";
import adminSchema from "../utils/adminValidator";
import { genarateToken } from "../utils/Tokenoperations"; // Ensure correct function name

export const addAdmin = async (req: Request, res: Response) => {
  try {
    if (!(await AdminService.checkAdminsNumber())) {
      res.status(401).json({ message: "You can't add users" });
      return;
    }
    const { value, error } = adminSchema(req.body);
    console.log(value);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
    const newAdmin = await AdminService.addAdmin(value);
    const token = genarateToken(newAdmin.dataValues.email); // Ensure correct function name
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "There is an error" });
  }
};
