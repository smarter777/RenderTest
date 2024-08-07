import Joi from "joi";
export const signupUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};':\"\\\\|,.<>/?]).+$"
      )
    )
    .required()
    .messages({
      "string.pattern.base": `"password" must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
    }),
  email: Joi.string().email().required(),
});
