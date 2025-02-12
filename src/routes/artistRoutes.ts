import { Router } from "express";
import {
  addArtist,
  getAllArtists,
  getOneArtist,
  deleteArtist,
  updateArtist,
} from "../controllers/artistController";
import { verifyToken } from "../utils/verifyToken";

export const artistRouter = Router();

artistRouter.get("/artists", getAllArtists);
artistRouter.get("/artist/:id", getOneArtist);
//For the Dashboard
artistRouter.post("/artists", verifyToken, addArtist);
artistRouter.delete("/artists/:id", verifyToken, deleteArtist);
artistRouter.put("/artists/", verifyToken, updateArtist);
