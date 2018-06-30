'use strict';

const criarUsuario = async (server) => {
  try {
    const data = await server.inject({
      method: 'POST',
      url: '/v1/usuario',
      payload: {
        nome: 'Renato Oda',
        email: 'renato.oda2@gmail.com',
        senha: 'abc123',
        ativo: true
      }
    });

    return data;
  } catch (err) {
    throw err;
  }
};

const getToken = async (server) => {
  try {
    const data = await server.inject({
      method: 'POST',
      url: '/v1/auth',
      payload: {
        email: 'renato.oda2@gmail.com',
        senha: 'abc123'
      }
    });

    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  criarUsuario,
  getToken
};
