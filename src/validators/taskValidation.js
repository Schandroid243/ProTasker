const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().allow('', null).optional(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
});

module.exports = { createTaskSchema, updateTaskSchema };
