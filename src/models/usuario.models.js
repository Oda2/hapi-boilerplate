'use strict';

const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  nome: String,
  admin: { type: Boolean, default: false },
  loja: String,
  facebook_id: String,
  google_id: String
});

UsuarioSchema.methods.checarSenha = function (body) { 
  if (body.facebook_id) {
    return (body.facebook_id == this.facebook_id);
  } if (body.google_id) {
    return (body.google_id == this.google_id);
  }  
  else {
    return (body.senha == this.senha);
  }
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
