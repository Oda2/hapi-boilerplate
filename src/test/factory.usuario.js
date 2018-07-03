'use strict';

const criarUsuario = async (server) => {
  const data = await server.inject({
    method: 'POST',
    url: '/v1/usuario',
    payload: {
      nome: 'Renato Oda',
      email: 'renato.oda2@gmail.com',
      senha: 'abc123',
      ativo: true,
      acesso: 'admin'
    }
  });

  return data;
};

const getToken = async (server) => {
  const data = await server.inject({
    method: 'POST',
    url: '/v1/auth',
    payload: {
      email: 'renato.oda2@gmail.com',
      senha: 'abc123'
    }
  });

  return data.result.access_token;
};

module.exports = {
  criarUsuario,
  getToken
};
