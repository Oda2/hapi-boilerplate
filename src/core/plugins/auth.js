'use strict';

const jwt = require('hapi-auth-jwt2');
const jsonWebToken = require('jsonwebtoken');

const key = process.env.KEYAUTH || 'bbEight';

const validate = async function (decoded, request) {
  const _token = request.headers.authorization.replace('Bearer ', '');

  jsonWebToken.verify(_token, key, (err, decoded) => {
    if (err) return { isValid: false };
    return { isValid: true };
  });
};

module.exports = {
  register: async (server) => {
    await server.register(jwt);

    server.auth.strategy('jwt', 'jwt',
      { key: key,
        validate: validate,
        verifyOptions: {
          algorithms: [ 'HS256' ]
        }
      });
  
    server.auth.default('jwt');
  },
  name: 'auth-jwt',
  version: '1.0.0'
};
