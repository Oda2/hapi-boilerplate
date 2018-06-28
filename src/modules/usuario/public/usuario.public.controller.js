'use strict';

const create = async (request, reply) => {
  try {
    const { Usuario } = request.database.models;
    const payload = request.payload;

    const novoUsuario = new Usuario(payload);
    await novoUsuario.save();

    return reply.response(novoUsuario).code(201);
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};

const getMe = async (request, reply) => {
  try {
    const { Usuario } = request.database.models;
    const credentials = request.auth.credentials;

    const _usuario = await Usuario.findById(credentials.id);
    if (!_usuario) return reply.notFound();
    return _usuario;
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};

module.exports = {
  create,
  getMe
};
