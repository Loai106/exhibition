import colors from "colors";
import { User } from "./UserModel";
import { Painting } from "./PaintingModel";
import { FavouritePainting } from "./FavouritePaintingModel";
import { Donation } from "./DonationModel";
import { Category } from "./CategoryModel";
import { CategoryPainting } from "./CategoryPaintingModel";
import { Artist } from "./ArtistModel";
import { ArtistPainting } from "./ArtistPaintingModel";
import { PaintingImage } from "./PaintingImageModel";
import { Exhibition } from "./ExhibitionModel";

export const setupAssociations = () => {
  //Many-to-many relationship between user and painting through FavouritePainting
  User.belongsToMany(Painting, {
    through: FavouritePainting,
    foreignKey: "user_id",
    otherKey: "painting_id",
  });

  Painting.belongsToMany(User, {
    through: FavouritePainting,
    foreignKey: "painting_id",
    otherKey: "user_id",
  });

  Painting.hasMany(FavouritePainting, {
    foreignKey: "painting_id",
  });

  User.hasMany(FavouritePainting, {
    foreignKey: "user_id",
  });

  FavouritePainting.belongsTo(Painting, {
    foreignKey: "painting_id",
  });

  FavouritePainting.belongsTo(User, {
    foreignKey: "user_id",
  });

  //Many-to-many relationship between user and painting through Donation
  User.belongsToMany(Painting, {
    through: Donation,
    foreignKey: "user_id",
    otherKey: "painting_id",
  });

  Painting.belongsToMany(User, {
    through: Donation,
    foreignKey: "painting_id",
    otherKey: "user_id",
  });

  Painting.hasMany(Donation, {
    foreignKey: "painting_id",
  });

  User.hasMany(Donation, {
    foreignKey: "user_id",
  });

  Donation.belongsTo(Painting, {
    foreignKey: "painting_id",
  });

  Donation.belongsTo(User, {
    foreignKey: "user_id",
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

  //success message
  console.log(colors.green("Models associations created successfully."));
};
