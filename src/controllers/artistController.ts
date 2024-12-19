import { Request, Response } from "express";
import ArtistServices from "../services/artistServices";

export const getAllArtists = async (req: Request, res: Response) => {
  try {
    const artists = await ArtistServices.getAllArtistsService();
    if (artists.length === 0) {
      res.status(200).json({
        message: "There are no artists for now",
      });
    } else {
      res.status(200).json(artists);
    }

    return;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getOneArtist = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({
        message: "Pleasr provide a valid id",
      });
    }
    const artist = await ArtistServices.getOneArtistService(id);
    if (artist === null) {
      res.status(404).json({
        message: "Artist not found",
      });
      return;
    }
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
