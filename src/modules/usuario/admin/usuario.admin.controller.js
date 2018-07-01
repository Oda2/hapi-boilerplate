'use strict';

const list = async (request, reply) => {
  try {
    const { Usuario } = request.database.models;
    const usuarios = await Usuario.find().exec();

    return usuarios;
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};

const get = async (request, reply) => {
  try {
    const { Usuario } = request.database.models;

    const usuario = await Usuario.findById(request.params.id);

    if (!usuario) return reply.notFound();
    return usuario;
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};

const create = async (request, reply) => {
  try {
    const { Usuario } = request.database.models;
    const payload = request.payload;

    const _usuario = await Usuario.findOne({ email: payload.email }).exec();

    if (_usuario) return reply.badRequest();

    const novoUsuario = new Usuario(payload);
    await novoUsuario.save();

    return reply.response(novoUsuario).code(201);
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};

const update = async (request, reply) => {
  try {
    const { Usuario } = request.database.models;

    const usuario = await Usuario.findByIdAndUpdate(request.params.id, request.payload, { upsert: true });

    if (!usuario) return reply.notFound();
    return usuario;
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};

const destroy = async (request, reply) => {
  try {
    const { Usuario } = request.database.models;

    const usuario = await Usuario.remove({ _id: request.params.id });

    if (!usuario) return reply.notFound();
    return reply.response({}).code(202);
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};

module.exports = {
  list,
  get,
  create,
  update,
  destroy
};
