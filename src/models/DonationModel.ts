import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import { User } from "./UserModel";
import { Painting } from "./PaintingModel";
import { ArtistDonation } from "./ArtistDonation";
import { PaintingService } from "../services/paintingService";

export const Donation = sequelize.define(
  "donation",
  {
    donation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    donation_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    donation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    donation_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: User, // References the user table
    //     key: "user_id",
    //   }
    //     },

    painting_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Painting, // References the painting table
        key: "painting_id",
      },
    },
    donor_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    donor_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "donation",
    timestamps: true,
  }
);

Donation.afterUpdate(async (donation: any) => {
  try {
    if (donation.donation_status === "completed") {
      const artists = (await PaintingService.getPainting(donation.painting_id))
        ?.dataValues.artists;

      for (let artist of artists) {
        await ArtistDonation.create({
          donation_id: donation.donation_id,
          artist_id: artist.artist_id,
          donation_amount: donation.donation_amount,
          painting_id: donation.painting_id,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});
