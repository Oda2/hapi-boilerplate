'use strict';

const Joi = require('joi');
const Schema = require('../usuario.schema');

const schema = Schema.getSchema();

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

const getMe = () => ({
  options: {
    stripUnknown: true
  }
});

module.exports = {
  create,
  getMe
};
