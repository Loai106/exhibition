import express from "express";
import { getAllPaintings } from "../controllers/exhibtionController";
import { getPaintingDetails } from "../controllers/paintingDetailsController";
import {
  addPainting,
  deletePainting,
  updatePainting,
} from "../controllers/paintingDashboardController";

const paintingRouter = express.Router();

paintingRouter.get("/paintings", getAllPaintings);
paintingRouter.get("/paintings/:painting_id", getPaintingDetails);
paintingRouter.post("/paintings/add-painting", addPainting);
paintingRouter.put("/paintings/update-painting", updatePainting);
paintingRouter.delete("/paintings/delete/:id", deletePainting);

export default paintingRouter;
