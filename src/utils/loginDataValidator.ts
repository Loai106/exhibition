import Joi from "joi";

export function validateUser(user: object) {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 1,
        tlds: { allow: ["com", "net", "org", "io"] },
      })
      .required(),
    password: Joi.string().min(4).required(),
  });

  const { value, error } = schema.validate(user);

  return { value, error };
}
