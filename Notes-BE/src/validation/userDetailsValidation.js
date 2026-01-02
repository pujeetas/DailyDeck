import Joi from "joi";

export const userDetailsValidation = Joi.object({
  firstName: Joi.string().min(3).max(50).optional(),

  lastName: Joi.string().min(3).max(50).optional(),

  userName: Joi.string().min(3).max(30).optional(),

  bio: Joi.string().max(500).optional(),

  jobTitle: Joi.string().max(100).optional(),

  emailNotification: Joi.boolean().optional(),

  browserNotification: Joi.boolean().optional(),

  gitHub: Joi.object({
    username: Joi.string().min(1).max(39).optional(),
    avatarUrl: Joi.string().uri().optional(),
    profileUrl: Joi.string().uri().optional(),
    bio: Joi.string().max(500).optional(),
    publicRepos: Joi.number().min(0).optional(),
    followers: Joi.number().min(0).optional(),
    following: Joi.number().min(0).optional(),
    verified: Joi.boolean().optional(),
    connectedAt: Joi.date().optional(),
  }).optional(),
});
