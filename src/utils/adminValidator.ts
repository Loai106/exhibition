import Joi from "joi";

const adminSchema = Joi.object({
  first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com", "net", "org", "io"] },
    })
    .trim()
    .required(),
  password: Joi.string().trim().min(6).max(14).required(),
});

function validateAdmin(admin: object) {
  const { value, error } = adminSchema.validate(admin);
  return { value, error };
}
export default validateAdmin;
