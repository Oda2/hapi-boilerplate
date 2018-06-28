'use strict';

const Joi = require('joi');

const schema = {
  email: Joi.string().email().min(1).max(255).trim(),
  senha: Joi.string().min(5).max(255).trim(),
  ativo: Joi.boolean(),
  google: Joi.string().trim(),
  facebook: Joi.string().trim()
};

const getSchema = () => ( schema );

module.exports = {
  getSchema
};
