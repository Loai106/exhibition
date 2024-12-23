import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";

// Define the User model
export const Artist = sequelize.define(
  "artist",
  {
    artist_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    artistStory: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    pob: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artistPic: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "artist",
    timestamps: true,
  }
);
