import { Router } from "express";
import {
  addArtist,
  getAllArtists,
  getOneArtist,
  deleteArtist,
  updateArtist,
  donationInfoByArtist,
} from "../controllers/artistController";
import { verifyToken } from "../utils/verifyToken";

export const artistRouter = Router();

artistRouter.get("/artists", getAllArtists);
artistRouter.get("/artist/:id", getOneArtist);
//For the Dashboard
artistRouter.post("/artists", verifyToken, addArtist);
artistRouter.delete("/artists/:id", verifyToken, deleteArtist);
artistRouter.put("/artists/", verifyToken, updateArtist);

artistRouter.get(
  "/artist-donation-info/:artist_id",
  verifyToken,
  donationInfoByArtist
);
