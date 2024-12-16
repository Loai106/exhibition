import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import { Painting } from "./PaintingModel";

export const PaintingImage = sequelize.define(
  "painting_image",
  {
    paintingImage_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imageUrl: {
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
      onDelete: "CASCADE", // Deletes association if the painting is deleted
    },
  },
  {
    tableName: "painting_image",
    timestamps: true,
  }
);
