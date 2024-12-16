import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import { Category } from "./CategoryModel";
import { Painting } from "./PaintingModel";

export const CategoryPainting = sequelize.define(
  "category_painting",
  {
    categoryPainting_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "category_id",
      },
      onDelete: "CASCADE",
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
    tableName: "category_painting",
    timestamps: true,
  }
);
