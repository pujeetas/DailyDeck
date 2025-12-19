import Joi from "joi";

export const userSigninValidation = Joi.object({
  firstName: Joi.string().min(3).max(10).required(),
  lastName: Joi.string().min(3).max(10),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .max(255)
    .required()
    .messages({
      "string.email": "Please enter a valid email address.",
      "string.min": "Email must be at least 5 characters long.",
      "string.max": "Email cannot exceed 255 characters.",
      "any.required": "Email is required.",
    }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password cannot exceed 30 characters",
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one symbol",
      "any.required": "Password is required",
    }),
});

export const userLoginValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .max(255)
    .required()
    .messages({
      "string.email": "Please enter a valid email address.",
      "string.min": "Email must be at least 5 characters long.",
      "string.max": "Email cannot exceed 255 characters.",
      "any.required": "Email is required.",
    }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password cannot exceed 30 characters",
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one symbol",
      "any.required": "Password is required",
    }),
});
