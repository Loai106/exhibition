import express from "express";
import { addAdmin } from "../controllers/adminController";

const router = express.Router();

router.post("/sign-up", addAdmin); // Ensure this is correctly set

export default router;
