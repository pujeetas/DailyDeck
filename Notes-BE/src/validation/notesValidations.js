import Joi from "joi";

export const createNoteValidations = Joi.object({
  title: Joi.string().allow("").max(200).optional(),
  body: Joi.array().items(Joi.any()).required(),
  pinned: Joi.boolean().required(),
});

export const updateNoteValidations = Joi.object({
  title: Joi.string().allow("").max(200).optional(),
  body: Joi.array().items(Joi.any()).optional(),
  pinned: Joi.boolean().optional(),
}).unknown(true);
