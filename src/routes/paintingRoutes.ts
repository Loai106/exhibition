import express from "express";
import { getAllPaintings } from "../controllers/exhibtionController";
import {
  addPainting,
  deletePainting,
  updatePainting,
} from "../controllers/paintingDashboardController";
import {
  getPaintingDetails,
  donationInfoByPainting,
} from "../controllers/paintingDetailsController";
import { donationInfoAllArtists } from "../controllers/artistController";
import { verifyToken } from "../utils/verifyToken";
const paintingRouter = express.Router();

paintingRouter.get("/paintings", getAllPaintings);
paintingRouter.get("/paintings/:painting_id", getPaintingDetails);
paintingRouter.post("/paintings/add-painting", verifyToken, addPainting);
paintingRouter.put("/paintings/update-painting", verifyToken, updatePainting);
paintingRouter.delete("/paintings/delete/:id", verifyToken, deletePainting);

paintingRouter.get(
  "/painting-donation-info/:painting_id",
  verifyToken,
  donationInfoByPainting
);
paintingRouter.get("/donations-history", verifyToken, donationInfoAllArtists);
export default paintingRouter;
