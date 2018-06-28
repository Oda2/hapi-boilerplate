'use strict';

const Boom = require('boom');

module.exports = {
  register: async (server) => {
    const badImplementationCustom = (err) => {
      if (!err) {
        throw Boom.badImplementation('method not implemented');
      }

      if (err.isBoom) return err;
  
      if (!err.name) {
        throw Boom.badRequest(err);
      }
  
      switch (err.name) {
      case 'AttributesInvalidError':
        throw Boom.badData('fields invalid header');
      case 'CastError':
        throw Boom.badRequest();
      default:
        throw Boom.badImplementation(err.message);
      }
    };
  
    await server.decorate('toolkit', 'badImplementationCustom', badImplementationCustom);
  },
  name: 'hapi-exception-custom',
  version: '1.0.0'
};
