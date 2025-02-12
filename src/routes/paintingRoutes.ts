import express from "express";
import { getAllPaintings } from "../controllers/exhibtionController";
import { getPaintingDetails } from "../controllers/paintingDetailsController";
import {
  addPainting,
  deletePainting,
  updatePainting,
} from "../controllers/paintingDashboardController";
import { verifyToken } from "../utils/verifyToken";

const paintingRouter = express.Router();

paintingRouter.get("/paintings", getAllPaintings);
paintingRouter.get("/paintings/:painting_id", getPaintingDetails);
paintingRouter.post("/paintings/add-painting", verifyToken, addPainting);
paintingRouter.put("/paintings/update-painting", verifyToken, updatePainting);
paintingRouter.delete("/paintings/delete/:id", verifyToken, deletePainting);

export default paintingRouter;
