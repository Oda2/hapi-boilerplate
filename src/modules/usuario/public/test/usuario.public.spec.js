/* global describe, before, it, expect, server */

const factory = require('../../../../test/factory.usuario');

describe('Usuario public', () => {

  before(async () => {
    token = await factory.getToken(server);
  });

  describe('Cadastro', () => {
    it('Deve cadastrar um novo usuario', async () => {
      const data = await server.inject({
        method: 'POST',
        url: '/v1/usuario',
        payload: {
          nome: 'Renato Oda',
          senha: 'abc123',
          email: 'renato.oda@email.com.br',
          ativo: true
        }
      });

      expect(data.statusCode).to.equals(201);
    });

    it('Deve retornar um erro ao tentar cadastrar um usuário com um e-mail existente', async () => {
      const data = await server.inject({
        method: 'POST',
        url: '/v1/usuario',
        payload: {
          nome: 'Renato Oda',
          senha: 'abc123',
          email: 'renato.oda@email.com.br',
          ativo: false
        }
      });

      expect(data.statusCode).to.equals(400);
    });

    it('Deve retornar erro ao tentar cadastrar um usuário com informações erradas na requisição', async () => {
      const data = await server.inject({
        method: 'POST',
        url: '/v1/usuario',
        payload: {
          nome1: 'Renato Oda',
          senha2: 'abc123',
          email3: 'renato.oda2@gmail.com'
        }
      });

      expect(data.statusCode).to.equals(400);
    });
  });

  describe('Consulta', () => {
    it('Deve retornar os dados do usuário pelo Token', async () => {
      const data = await server.inject({
        method: 'GET',
        url: '/v1/usuario',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      expect(data.statusCode).to.equals(200);
      expect(data.result).to.exists();
      expect(data.result.nome).to.exists();
      expect(data.result.email).to.exists();
      expect(data.result.nome).to.equals('Renato Oda');
      expect(data.result.email).to.equals('renato.oda2@gmail.com');
    });
  });

});
