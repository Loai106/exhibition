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
    console.log("Fuck this shittttttttttttttttt");
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

export const addArtist = async (req: Request, res: Response) => {
  try {
    const artist = await ArtistServices.addArtistService(req.body);
    res.status(artist.status).json(artist.body);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteArtist = async (req: Request, res: Response) => {
  try {
    const artist_id = req.params.id;
    if (isNaN(parseInt(artist_id))) {
      res
        .status(400)
        .json({ message: "Delete unsuccessful, Please provide a valid id" });
      return;
    }
    const result = await ArtistServices.deleteArtistService(
      parseInt(artist_id)
    );
    res.status(result.status).json(result.message);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const updateArtist = async (req: Request, res: Response) => {
  try {
    const artist = await ArtistServices.updateArtistService(req.body);
    console.log(artist.status);

    res.status(artist.status).json(artist.body || {});
  } catch (error) {
    res.status(500).json(error.message);
  }
};
