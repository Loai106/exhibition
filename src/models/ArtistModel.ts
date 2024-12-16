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
      type: DataTypes.STRING,
      allowNull: false,
    },
    pob: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    artistPic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "artist",
    timestamps: true,
  }
);
