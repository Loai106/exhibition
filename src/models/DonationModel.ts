import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import { Painting } from "./PaintingModel";
import { ArtistDonation } from "./ArtistDonation";
import { PaintingService } from "../services/paintingService";

export const Donation = sequelize.define(
  "donation",
  {
    donation_id: {
      type: DataTypes.STRING,
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

// Add afterUpdate Hook
Donation.afterUpdate(async (donation: any, options) => {
  console.log("after update hook");

  if (
    donation.changed("donation_status") &&
    donation.donation_status === "completed"
  ) {
    try {
      // Fetch painting details
      const painting = await Painting.findByPk(donation.painting_id);
      if (!painting) {
        console.error("Painting not found for donation:", donation.donation_id);
        return;
      }

      try {
        if (donation.donation_status === "completed") {
          const artists = (
            await PaintingService.getPainting(donation.painting_id)
          )?.dataValues.artists;

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

      console.log(
        `ArtistDonation entry created for donation: ${donation.donation_id}`
      );
    } catch (error) {
      console.error("Error creating ArtistDonation entry:", error);
    }
  }
});

// Donation.afterUpdate(async (donation: any) => {
//   console.log("after update hook");

// });
