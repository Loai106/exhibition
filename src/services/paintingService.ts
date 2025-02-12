import { Artist } from "../models/ArtistModel";
import { Painting } from "../models/PaintingModel";
import {
  validatePaintingData,
  validateUpdatePaintingData,
} from "../utils/dataValidation";

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
    return await Painting.create({
      paintingName: new_painting.painting_name,
      description: new_painting.description,
      height: new_painting.height,
      width: new_painting.width,
      date: new_painting.date,
      exhibition_id: new_painting.exhibition_id,
      painting_url: new_painting.painting_url,
    });
  }
  static async updatePainting(painting: object) {
    const { error, value } = validateUpdatePaintingData(painting);

    if (error) {
      return {
        status: 400,
        body: { message: error.message },
      };
    }
    const updated = await Painting.update(painting, {
      where: {
        painting_id: value.painting_id,
      },
    });
    return { status: updated ? 204 : 404 };
  }

  static async deletePainting(painting_id: number) {
    const painting = await Painting.destroy({
      where: { painting_id },
    });

    return {
      status: 200,
      message: {
        Message: "Painting deleted successfully",
      },
    };
  }
}
