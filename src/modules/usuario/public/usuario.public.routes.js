'use strict';

const Controller = require('./usuario.public.controller');
const Validator = require('./usuario.public.validation');

module.exports = {
  register: async (server) => {
    server.route([
      {
        method: 'GET',
        path: '/usuario',
        config: {
          auth: {
            scope: ['admin', 'public']
          },
          handler: Controller.getMe,
          validate: Validator.getMe()
        }
      },
      {
        method: 'POST',
        path: '/usuario',
        config: {
          description: 'Criar um novo Usuário',
          notes: 'Cria um novo usuário',
          tags: ['api', 'public', 'usuario'],
          auth: false,
          handler: Controller.create,
          validate: Validator.create()
        }
      }
    ]);
  },
  name: 'usuario-public-route',
  version: '1.0.0'
};
