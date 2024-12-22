import { Artist } from "../models/ArtistModel";
import { Painting } from "../models/PaintingModel";

export class PaintingService {
  //return all the painting for the exhibtion
  static async getAllPaintings() {
    return await Painting.findAll({
      attributes: [
        "painting_id",
        "paintingName",
        "date",
        "height",
        "width",
        "painting_url",
      ],
      include: [
        {
          model: Artist,
          attributes: ["artist_id", "firstName", "lastName"],
        },
      ],
    });
  }
  //getting painting by id
  static async getPainting(painting_id: number) {
    const painting = await Painting.findByPk(painting_id, {
      include: [
        {
          model: Artist,
        },
      ],
    });

    return painting;
  }
}
