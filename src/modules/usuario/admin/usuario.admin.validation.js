'use strict';

const Joi = require('joi');
const Schema = require('../usuario.schema');

const schema = Schema.getSchema();
// const query = Schema.getQuery();

const create = () => ({
  options: {
    stripUnknown: true
  },
  payload: Joi.object({
    nome: schema.nome.required(),
    senha: schema.senha.required(),
    email: schema.email.required(),
    facebook: schema.facebook.optional(),
    google: schema.google.optional(),
    ativo: schema.ativo.required(),
    acesso: schema.acesso.optional().default('public')
  }).label('Usuario')
});

const get = () => ({
  options: {
    stripUnknown: true
  },
  params: {
    id: schema.id.required()
  }
});

const update = () => ({
  options: {
    stripUnknown: true
  },
  params: {
    id: schema.id.required()
  },
  payload: Joi.object({
    nome: schema.nome.optional(),
    senha: schema.senha.optional(),
    email: schema.email.optional(),
    facebook: schema.facebook.optional(),
    google: schema.google.optional()
  }).label('Usuario')
});

module.exports = {
  get,
  create,
  update
};
