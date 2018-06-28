'use strict';

const jwt = require('hapi-auth-jwt2');
const jsonWebToken = require('jsonwebtoken');

const { getKeyAuth } = require('../utils/load');

const config = getKeyAuth();

const validate = async function (decoded, request) {
  const _token = request.headers.authorization.replace('Bearer ', '');

  return jsonWebToken.verify(_token, config.key, async (err, decoded) => {
    if (err) return { isValid: false };
    const { Usuario } = request.database.models;
    const _usaurio = await Usuario.findOne({ _id: decoded.id, ativo: true } );
    if (!_usaurio) return { isValid: false };
    return { isValid: true };
  });
};

module.exports = {
  register: async (server) => {
    await server.register(jwt);

    server.auth.strategy('jwt', 'jwt',
      {
        key: config.key,
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
