import Joi from "joi";

const artistSchema = Joi.object({
  artist_id: Joi.number().integer().positive().optional(),
  firstName: Joi.string().trim().required().messages({
    "string.empty": "First name cannot be empty.",
  }),
  lastName: Joi.string().trim().required().messages({
    "string.empty": "Last name cannot be empty.",
  }),
  artistStory: Joi.string().trim().required().messages({
    "string.empty": "Artist story cannot be empty.",
  }),
  pob: Joi.string().trim().required().messages({
    "string.empty": "Place of birth cannot be empty.",
  }),
  age: Joi.string().trim().required().messages({
    "string.empty": "Age cannot be empty.",
  }),
  artistPic: Joi.string().uri().trim().required().messages({
    "string.empty": "Artist picture URL cannot be empty.",
    "string.uri": "Artist picture must be a valid URL.",
  }),
});

export default artistSchema;
