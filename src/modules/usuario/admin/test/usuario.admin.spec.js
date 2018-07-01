/* global describe, before, it, expect, server */

const factory = require('../../../../test/factory.usuario');

describe('Usuario admin', () => {
  let token = null;
  let id = null;
  
  before((done) => {
    factory.getTokenCliente(server)
      .then((context) => {
        token = context.access_token;
        done();
      });
  });

  describe('Cadastro', () => {
    it('Deve cadastrar um novo usuario', async () => {
      const data = await server.inject({
        method: 'POST',
        url: '/v1/usuario/admin',
        payload: {
          nome: 'Renato Oda',
          senha: 'abc123',
          email: 'renato.oda2@email.com.br',
          ativo: true
        }
      });

      expect(data.statusCode).to.equals(201);
      expect(data.id).to.exists();

      let id = data.id;
    });

    it('Deve retornar um erro ao tentar cadastrar um usuário com um e-mail existente', async () => {
      const data = await server.inject({
        method: 'POST',
        url: '/v1/usuario',
        payload: {
          nome: 'Renato Oda',
          senha: 'abc123',
          email: 'renato.oda2@email.com.br',
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
          email3: 'renato.oda2@gmail.com',
          ativo: true
        }
      });

      expect(data.statusCode).to.equals(400);
    });
  });

});
