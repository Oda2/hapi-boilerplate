'use strict';

const Controller = require('./autenticacao.public.controller');
const Validator = require('./autenticacao.public.validation');

module.exports = {
  register: async (server) => {
    server.route([
      {
        method: 'POST',
        path: '/auth',
        config: {
          description: 'Autenticação',
          notes: 'Obtem um token de autenticação',
          tags: ['api', 'public', 'auth'],
          auth: false,
          handler: Controller.auth,
          validate: Validator.login()
        }
      }
    ]);
  },
  name: 'autenticacao-public-route',
  version: '1.0.0'
};
