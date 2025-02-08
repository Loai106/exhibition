import colors from "colors";
import { Painting } from "./PaintingModel";
import { FavouritePainting } from "./FavouritePaintingModel";
import { Donation } from "./DonationModel";
import { Category } from "./CategoryModel";
import { CategoryPainting } from "./CategoryPaintingModel";
import { Artist } from "./ArtistModel";
import { ArtistPainting } from "./ArtistPaintingModel";
import { PaintingImage } from "./PaintingImageModel";
import { Exhibition } from "./ExhibitionModel";
import { ArtistDonation } from "./ArtistDonation";

export const setupAssociations = () => {
  Painting.hasMany(Donation, {
    foreignKey: "painting_id",
  });

  Donation.belongsTo(Painting, {
    foreignKey: "painting_id",
  });

  //Many-to-many relationship between category and painting through categoryPainting
  Category.belongsToMany(Painting, {
    through: CategoryPainting,
    foreignKey: "category_id",
    otherKey: "painting_id",
  });

  Painting.belongsToMany(Category, {
    through: CategoryPainting,
    foreignKey: "painting_id",
    otherKey: "category_id",
  });

  Category.hasMany(CategoryPainting, {
    foreignKey: "category_id",
  });

  Painting.hasMany(CategoryPainting, {
    foreignKey: "painting_id",
  });

  CategoryPainting.belongsTo(Category, {
    foreignKey: "category_id",
  });

  CategoryPainting.belongsTo(Painting, {
    foreignKey: "painting_id",
  });

  //Many-to-many relationship between artist and painting through artistPainting
  Artist.belongsToMany(Painting, {
    through: ArtistPainting,
    foreignKey: "artist_id",
    otherKey: "painting_id",
  });

  Painting.belongsToMany(Artist, {
    through: ArtistPainting,
    foreignKey: "painting_id",
    otherKey: "artist_id",
  });

  Painting.hasMany(ArtistPainting, {
    foreignKey: "painting_id",
  });

  Artist.hasMany(ArtistPainting, {
    foreignKey: "artist_id",
  });

  ArtistPainting.belongsTo(Painting, {
    foreignKey: "painting_id",
  });

  ArtistPainting.belongsTo(Artist, {
    foreignKey: "artist_id",
  });

  //One-to-many relationship between painting and paintingImage
  Painting.hasMany(PaintingImage, {
    foreignKey: "painting_id",
  });

  PaintingImage.belongsTo(Painting, {
    foreignKey: "painting_id",
  });

  //One-to-many relationship between painting and paintingImage
  Exhibition.hasMany(Painting, {
    foreignKey: "exhibition_id",
  });

  Painting.belongsTo(Exhibition, {
    foreignKey: "exhibition_id",
  });

  //many to many relationship between artist and donation
  Artist.belongsToMany(Donation, {
    through: ArtistDonation,
    foreignKey: "artist_id",
    otherKey: "donation_id",
  });

  Donation.belongsToMany(Artist, {
    through: ArtistDonation,
    foreignKey: "donation_id",
    otherKey: "artist_id",
  });

  //one to many relationship between artist and artistDonation model
  Artist.hasMany(ArtistDonation, {
    foreignKey: "artist_id",
  });
  ArtistDonation.belongsTo(Artist, {
    foreignKey: "artist_id",
  });
  //one to many relationshipt between Donation and artistDonation model
  Donation.hasMany(ArtistDonation, {
    foreignKey: "donation_id",
  });
  ArtistDonation.belongsTo(Donation, {
    foreignKey: "donation_id",
  });
  //success message
  console.log(colors.green("Models associations created successfully."));
};
