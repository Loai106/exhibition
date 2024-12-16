import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";

export const Exhibition = sequelize.define(
  "exhibition",
  {
    exhibition_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    exhibitionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exhibitionStory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exhibitionUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "exhibition",
    timestamps: true,
  }
);
