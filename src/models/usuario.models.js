'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  nome: String,
  acesso: { type: String, default: 'public' },
  facebook_id: String,
  google_id: String,
  ativo: { type: Boolean, default: false }
});

UsuarioSchema.pre('save', function (next) {
  const _usuario = this;
  if (!_usuario.isModified('senha')) return next();

  _usuario.senha = criptografarSenha(_usuario.senha);
  return next();
});

UsuarioSchema.pre('findOneAndUpdate', function (next) {
  const senha = criptografarSenha(this.getUpdate().senha);
  if (!senha) return next();
  this.findOneAndUpdate({}, { senha: senha } );
  return next();
});

UsuarioSchema.methods.checarSenha = function (payload) { 
  if (payload.facebook_id) {
    return (payload.facebook_id == this.facebook_id);
  } if (payload.google_id) {
    return (payload.google_id == this.google_id);
  }  
  else {
    return bcrypt.compareSync(payload.senha, this.senha);
  }
};

const criptografarSenha = (senha) => {
  if (!senha) return false;
  return bcrypt.hashSync(senha, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
