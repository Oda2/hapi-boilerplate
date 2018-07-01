/* global describe, before, it, expect, server */

describe('Usuario public', () => {

  describe('Cadastro', () => {
    it('Deve cadastrar um novo usuario', async () => {
      const data = await server.inject({
        method: 'POST',
        url: '/v1/usuario',
        payload: {
          nome: 'Renato Oda',
          senha: 'abc123',
          email: 'renato.oda@email.com.br'
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
          email: 'renato.oda@email.com.br'
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

});
