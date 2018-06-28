'use strict';

const Joi = require('joi');
const Schema = require('../autenticacao.schema');

const schema = Schema.getSchema();

const login = () => ({
  options: {
    stripUnknown: true
  },
  payload: Joi.object({
    email: schema.email.required(),
    senha: schema.senha.required(),
    // facebook: schema.facebook.optional(),
    // google: schema.google.optional()
  }).label('Autenticacao')
});

module.exports = {
  login
};
