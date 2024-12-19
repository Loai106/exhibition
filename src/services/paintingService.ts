import { Painting } from "../models/PaintingModel";

export class PaintingService {
  //return all the painting for the exhibtion
  static async getAllPaintings() {
    return await Painting.findAll({});
  }
  //getting painting by id
  static async getPainting(painting_id: number) {
    return await Painting.findByPk(painting_id);
  }
}
