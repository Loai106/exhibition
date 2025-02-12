import express from "express";
import { addAdmin, login } from "../controllers/adminController";

const router = express.Router();

router.post("/sign-up", addAdmin); // Ensure this is correctly set
router.post("/login", login);
export default router;
