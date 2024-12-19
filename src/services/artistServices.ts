import { sequelize } from "../config/db";
import { Artist } from "../models/ArtistModel";
import { Painting } from "../models/PaintingModel";

export default class ArtistServices {
  static async getAllArtistsService() {
    const artists = Artist.findAll({
      raw: true,
    });
    return artists;
  }

  static async getOneArtistService(artist_id: number) {
    const artist = Artist.findByPk(artist_id, {
      include: {
        model: Painting,
      },
    });
    return artist;
  }
}
