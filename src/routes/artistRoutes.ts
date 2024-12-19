import { Router } from "express";
import { getAllArtists, getOneArtist } from "../controllers/artistController";

export const artistRouter = Router();

artistRouter.get("/artists", getAllArtists);
artistRouter.get("/artist/:id", getOneArtist);
