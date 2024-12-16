import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import { Painting } from "./PaintingModel";
import { Artist } from "./ArtistModel";

export const ArtistPainting = sequelize.define(
  "artist_painting",
  {
    artistPainting_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    tableName: "artist_painting",
    timestamps: true,
  }
);
