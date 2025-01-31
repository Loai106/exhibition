import { sequelize } from "../config/db";
import { Artist } from "../models/ArtistModel";
import { Painting } from "../models/PaintingModel";
import artistSchema from "../utils/artistValidator";
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
  static async addArtistService(artist: object) {
    const { error, value: validArtist } = artistSchema.validate(artist);
    if (error) {
      return { status: 400, body: { message: error.message } };
    }

    const newArtist = await Artist.create(validArtist);
    return { status: 201, body: newArtist };
  }
  static async deleteArtistService(artist_id: number) {
    const numberOfDeletedRows = await Artist.destroy({
      where: { artist_id },
    });

    return {
      status: 200,
      message: {
        message: "Resource deleted successfully.",
      },
    };
  }
  static async updateArtistService(artist: any) {
    const { error, value: validArtist } = artistSchema.validate(artist);

    if (error) {
      return { status: 400, body: { message: error.message } };
    }

    console.log(`This is the id ${validArtist.artis_id}`);
    const [rows] = await Artist.update(artist, {
      where: {
        artist_id: validArtist.artist_id,
      },
    });

    return { status: rows ? 204 : 404 };
  }
}
