import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import { Painting } from "./PaintingModel";
import { User } from "./UserModel";
export const FavouritePainting = sequelize.define(
  "favourite_painting",
  {
    favPainting_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // References the user table
        key: "user_id",
      },
      onDelete: "CASCADE", // Deletes association if the user is deleted
    },
  },
  {
    tableName: "favourite_painting",
    timestamps: true,
  }
);
