import express from "express";
import { getAllPaintings } from "../controllers/exhibtionController";
import { getPaintingDetails } from "../controllers/paintingDetailsController";

const paintingRouter = express.Router();

paintingRouter.get("/paintings", getAllPaintings);
paintingRouter.get("/paintings/:painting_id", getPaintingDetails);

export default paintingRouter;
