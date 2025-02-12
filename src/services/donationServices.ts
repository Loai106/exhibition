import { ArtistDonation } from "../models/ArtistDonation";
import { Artist } from "../models/ArtistModel";
import { Donation } from "../models/DonationModel";
import { Painting } from "../models/PaintingModel";
import { Sequelize, Op } from "sequelize";
export class DonationService {
  static async addDonation(
    donation_id: string,
    name: string,
    email: string,
    amount: number,
    painting_id: number
  ) {
    return await Donation.create({
      donation_id,
      donation_amount: amount,
      donation_date: Date.now(),
      donation_status: "not completed",
      painting_id,

      donor_name: name,
      donor_email: email,
    });
  }

  static async updateStatus(donation_id: string) {
    await Donation.update(
      { donation_status: "completed" },
      {
        where: {
          donation_id,
        },
        individualHooks: true,
      }
    );
  }

  static async getDonationByArtistService(artist_id: number) {
    const info = await ArtistDonation.findOne({
      where: {
        artist_id,
      },
      attributes: [
        "artist_id",
        [Sequelize.literal("SUM(donation_amount)"), "total_donation_amount"],
        [Sequelize.literal("COUNT(artist_id)"), "number_of_donations"],
      ],
      group: ["artist_id"],
    });

    return info;
  }

  static async getDonationForAllArtists() {
    const info = await ArtistDonation.findAll({
      attributes: ["artist_id", "donation_amount", "createdAt"],
      include: [
        {
          model: Artist,
          attributes: ["firstName", "lastName"],
        },
      ],
    });

    return info;
  }
  static async getDonationByPaintingService(painting_id: number) {
    const info = await Donation.findOne({
      raw: true,
      where: {
        painting_id,
      },
      attributes: [
        "painting_id",
        [Sequelize.literal("SUM(donation_amount)"), "total_donation_amount"],
        [Sequelize.literal("COUNT(painting_id)"), "number_of_donations"],
      ],
      group: ["painting_id"],
    });

    return info;
  }
}
