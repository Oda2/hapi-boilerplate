'use strict';

module.exports = {
  register: async (server) => {
    server.route(
      {
        method: 'GET',
        path: '/produto/admin',
        options: {
          handler: async (request, reply) => {
            return reply.response({ code: 1 }).code(201);
          } 
        }
      }
    );
  },
  name: 'produto-admin-route',
  version: '1.0.0'
};
