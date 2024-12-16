import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import { Artist } from "./ArtistModel";
import { Exhibition } from "./ExhibitionModel";

export const Painting = sequelize.define(
  "painting",
  {
    painting_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    paintingName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Artist, // References the artist table
        key: "artist_id",
      },
      onDelete: "CASCADE", // Deletes association if the artist is deleted
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exhibition_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Exhibition, // References the exhibition table
        key: "exhibition_id",
      },
      onDelete: "CASCADE", // Deletes association if the exhibition is deleted
    },
    sold: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "painting",
    timestamps: true,
  }
);
