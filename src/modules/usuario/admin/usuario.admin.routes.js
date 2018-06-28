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
          auth: {
            scope: ['admin']
          },
          handler: Controller.list
        }
      },
      {
        method: 'POST',
        path: '/usuario/admin',
        config: {
          auth: {
            scope: ['admin']
          },
          handler: Controller.create,
          validate: Validator.create()
        }
      },
      {
        method: 'GET',
        path: '/usuario/admin/{id}',
        config: {
          auth: {
            scope: ['admin']
          },
          handler: Controller.get,
          validate: Validator.get()
        }
      },
      {
        method: 'PUT',
        path: '/usuario/admin/{id}',
        config: {
          auth: {
            scope: ['admin']
          },
          handler: Controller.update,
          validate: Validator.update()
        }
      },
      {
        method: 'DELETE',
        path: '/usuario/admin/{id}',
        config: {
          auth: {
            scope: ['admin']
          },
          handler: Controller.destroy,
          validate: Validator.get()
        }
      }
    ]);
  },
  name: 'usuario-admin-route',
  version: '1.0.0'
};
