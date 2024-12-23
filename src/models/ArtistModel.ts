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
    age: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    artistPic: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:
        "https://asset.cloudinary.com/dgzsvpncq/8bc99124f179956aa6a0ffd2d959a996",
    },
  },
  {
    tableName: "artist",
    timestamps: true,
  }
);
