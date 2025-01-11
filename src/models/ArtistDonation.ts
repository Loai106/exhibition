import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import { Artist } from "./ArtistModel";
import { Donation } from "./DonationModel";

export const ArtistDonation = sequelize.define("artist_donation", {
  artistDonation_id: {
    type: DataTypes.UUID,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  donation_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Donation,
      key: "donation_id",
    },
  },
  artist_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Artist,
      key: "artist_id",
    },
  },
  donation_amount: { type: DataTypes.INTEGER, allowNull: false },
  painting_id: { type: DataTypes.INTEGER, allowNull: false },
});
