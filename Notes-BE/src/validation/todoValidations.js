const Joi = require("joi");

const allowedStatus = ["backlog", "progress", "review", "done"];

const createTodoValidations = Joi.object({
  title: Joi.string().min(1).max(100).required(),

  issueId: Joi.string().max(50).allow(""),

  tech: Joi.array().items(Joi.string().min(1).max(30)).max(20).optional(),

  status: Joi.string()
    .valid(...allowedStatus)
    .required(),

  priority: Joi.string().valid("high", "medium", "low", "").allow(""),

  description: Joi.string().max(2000).allow(""),

  subTask: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),

        text: Joi.string().required(),
        complete: Joi.boolean().default(false),
      })
    )
    .optional(),

  focused: Joi.boolean().default(false),
  dueDate: Joi.date(),
});

const updateTodoValidations = Joi.object({
  title: Joi.string().min(1).max(100).optional(),
  issueId: Joi.string().max(50).allow("").optional(),
  tech: Joi.array().items(Joi.string().min(1).max(30)).max(20).optional(),
  status: Joi.string()
    .valid(...allowedStatus)
    .optional(),
  priority: Joi.string().valid("high", "medium", "low", "").optional(),
  description: Joi.string().max(2000).allow("").optional(),
  dueDate: Joi.date().optional(),
  subTask: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        text: Joi.string().required(),
        complete: Joi.boolean().default(false),
      })
    )
    .optional(),
  focused: Joi.boolean().optional(),
}).unknown(true);
module.exports = { createTodoValidations, updateTodoValidations };
