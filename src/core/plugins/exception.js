'use strict';

const Boom = require('boom');

module.exports = {
  register: async (server) => {
    const badImplementationCustom = (err) => {
      if (!err) {
        return this.response(Boom.badImplementation('method not implemented'));
      }
  
      if (!err.name) {
        return this.response(Boom.badRequest(err));
      }
  
      switch (err.name) {
      case 'AttributesInvalidError':
        return this.response(Boom.badData('fields invalid header'));
      default:
        return this.response(Boom.badImplementation(err.message));
      }
    };
  
    await server.decorate('toolkit', 'badImplementationCustom', badImplementationCustom);
  },
  name: 'hapi-exception-custom',
  version: '1.0.0'
};
