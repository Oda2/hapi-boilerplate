'use strict';

const jwt = require('jsonwebtoken');
const { getKeyAuth } = require('../../../core/utils/load');

const config = getKeyAuth();

const generateToken = (usuario, expiresIn) => ({
  access_token: jwt.sign({
    id: usuario._id,
    scope: [usuario.acesso]
  }, config.key, { expiresIn } )
});

const auth = async (request, reply) => {
  try {
    const { Usuario } = request.database.models;
    const payload = request.payload;

    const _usuario = await Usuario.findOne({ email: payload.email, ativo: true });

    if (!_usuario) return reply.unauthorized('Email ou senha inválidos');
    if (!_usuario.checarSenha(payload)) return reply.unauthorized('Email ou senha inválidos');
    return generateToken(_usuario, '2H');
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};


module.exports = {
  auth
};
