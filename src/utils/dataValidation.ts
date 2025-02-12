import Joi from "joi";

export function validateData(user: object) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 1,
        tlds: { allow: ["com", "net", "org", "io"] },
      })
      .required(),
    amount: Joi.number().required(),
  });

  const { value, error } = schema.validate(user);

  return { value, error };
}

export function validatePaintingData(painting: object) {
  const schema = Joi.object({
    painting_name: Joi.string().min(2).max(30).required(),
    description: Joi.string().required(),
    height: Joi.number().required(),
    width: Joi.number().required(),
    date: Joi.date(),
    exhibition_id: Joi.number().required(),
    painting_url: Joi.string().uri().required(),
  });

  const { value, error } = schema.validate(painting);
  return { value, error };
}
export function validateUpdatePaintingData(painting: object) {
  const schema = Joi.object({
    painting_id: Joi.number().required(),
    painting_name: Joi.string().min(2).max(30).required(),
    description: Joi.string().required(),
    height: Joi.number().required(),
    width: Joi.number().required(),
    date: Joi.date(),
    exhibition_id: Joi.number().required(),
    painting_url: Joi.string().uri().required(),
  });

  const { value, error } = schema.validate(painting);
  return { value, error };
}
