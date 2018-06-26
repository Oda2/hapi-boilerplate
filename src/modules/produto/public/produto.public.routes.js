'use strict';

module.exports = {
  register: async (server) => {
    server.route(
      {
        method: 'GET',
        path: '/produto',
        options: {
          handler: async (request, reply) => {
            return reply.response({ code: 1 }).code(201);
          } 
        }
      }
    );
  },
  name: 'produto-public-route',
  version: '1.0.0'
};
