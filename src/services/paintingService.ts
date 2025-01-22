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
  //adding new painting
  static async addPainting(new_painting: any) {
    const painting = await Painting.create({
      paintingName: new_painting.painting_name,
      describion: new_painting.description,
      height: new_painting.height,
      width: new_painting.width,
      date: new_painting.date,
      exhibition_id: new_painting.exhibition_id,
      painting_url: new_painting.painting_url,
    });
  }
}
