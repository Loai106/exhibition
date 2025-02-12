import { Request, Response } from "express";
import AdminService from "../services/adminService";
import adminSchema from "../utils/adminValidator";
import { genarateToken } from "../utils/Tokenoperations"; // Ensure correct function name
import { validateUser } from "../utils/loginDataValidator";
import bcrypt from "bcrypt";
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

export const login = async (req: Request, res: Response) => {
  try {
    //take user info
    const { email, password } = req.body;
    //validate info
    const { value, error } = validateUser({ email, password });

    if (error) {
      res.status(400).json(error);
      return;
    }
    //check exist email
    const admin = await AdminService.findAdminEmail(value.email);
    if (!admin) {
      res.status(400).json({ message: "email not found" });
      return;
    }
    //check correct password
    if (await bcrypt.compare(value.password, admin?.dataValues.password)) {
      //generate token
      const token = genarateToken(email);
      res.status(201).json({ token });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "database error" });
    console.log(error);
    return;
  }
};
