'use strict';

module.exports = {
  register: async (server) => {
    server.route(
      {
        method: 'GET',
        path: '/autenticacao',
        options: {
          handler: async (request, reply) => {
            return reply.response({ code: 1 }).code(201);
          } 
        }
      }
    );
  },
  name: 'autenticacao-public-route',
  version: '1.0.0'
};
