'use strict';

const Controller = require('./usuario.public.controller');
const Validator = require('./usuario.public.validation');

module.exports = {
  register: async (server) => {
    server.route(
      {
        method: 'POST',
        path: '/usuario',
        config: {
          auth: false,
          handler: Controller.create,
          validate: Validator.create()
        }
      }
    );
  },
  name: 'usuario-public-route',
  version: '1.0.0'
};
