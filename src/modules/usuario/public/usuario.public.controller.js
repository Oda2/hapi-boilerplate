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

module.exports = {
  create
};
