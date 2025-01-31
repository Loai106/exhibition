import { Router } from "express";
import {
  addArtist,
  getAllArtists,
  getOneArtist,
  deleteArtist,
  updateArtist,
} from "../controllers/artistController";

export const artistRouter = Router();

artistRouter.get("/artists", getAllArtists);
artistRouter.get("/artist/:id", getOneArtist);
//For the Dashboard
artistRouter.post("/artists", addArtist);
artistRouter.delete("/artists/:id", deleteArtist);
artistRouter.put("/artists/", updateArtist);
