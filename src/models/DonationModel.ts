import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import { User } from "./UserModel";
import { Painting } from "./PaintingModel";

export const Donation = sequelize.define(
  "donation",
  {
    donation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    donationAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    donationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    donationStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // References the user table
        key: "user_id",
      },
      onDelete: "CASCADE", // Deletes association if the user is deleted
    },
    painting_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Painting, // References the painting table
        key: "painting_id",
      },
      onDelete: "CASCADE", // Deletes association if the painting is deleted
    },
  },
  {
    tableName: "donation",
    timestamps: true,
  }
);
