'use strict';

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../../../package');

module.exports = {
  register: async (server) => {
    const swaggerOptions = {
      schemes: ['http'],
      host: 'localhost',
      swaggerUIPath: '/v1/',
      jsonPath: '/v1/wagger.json',
      info: {
        'title': 'Hapi-Api',
        'description': 'Documentação Hapi API',
        'version': Pack.version,
        'contact': {
          'email': 'renato.oda2@gmail.com'
        },
        'license': {
          'name': 'MIT',
          'url': 'https://github.com/Oda2/hapi-boilerplate/blob/master/LICENSE'
        }
      },
      jsonEditor: true,
      documentationPath: '/v1/docs',
      pathPrefixSize: 1,
      securityDefinitions: {
        'Bearer': {
          'type': 'apiKey',
          'name': 'Authorization',
          'in': 'header'
        }
      },
      security: [{ 'Bearer ': [] }]
    };

    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      }
    ]);
  },
  name: 'documentation',
  version: '1.0.0'
};
