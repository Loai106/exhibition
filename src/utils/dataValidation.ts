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
