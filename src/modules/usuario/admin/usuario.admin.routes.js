'use strict';

const Controller = require('./usuario.admin.controller');
const Validator = require('./usuario.admin.validation');

module.exports = {
  register: async (server) => {
    server.route([
      {
        method: 'GET',
        path: '/usuario/admin',
        config: {
          auth: false,
          handler: Controller.list
        }
      },
      {
        method: 'POST',
        path: '/usuario/admin',
        config: {
          auth: false,
          handler: Controller.create,
          validate: Validator.create()
        }
      }
    ]);
  },
  name: 'usuario-admin-route',
  version: '1.0.0'
};
