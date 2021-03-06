'use strict';

const Joi = require('joi');

const schema = {
  id: Joi.string().trim(),
  nome: Joi.string().trim(),
  email: Joi.string().email().min(1).max(255).trim(),
  senha: Joi.string().min(5).max(255).trim(),
  ativo: Joi.boolean(),
  google: Joi.string().trim(),
  facebook: Joi.string().trim(),
  acesso: Joi.string().trim()
};

const query = {
  page: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(0)
};

const getSchema = () => ( schema );
const getQuery = () => ( query );

module.exports = {
  getSchema,
  getQuery
};
