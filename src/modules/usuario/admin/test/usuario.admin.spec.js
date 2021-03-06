/* global describe, before, it, expect, server */

const factory = require('../../../../test/factory.usuario');

describe('Usuario admin', () => {
  let token = null;
  let id = null;
  
  before(async () => {
    token = await factory.getToken(server);
  });

  describe('Cadastro', () => {
    it('Deve cadastrar um novo usuario', async () => {
      const data = await server.inject({
        method: 'POST',
        url: '/v1/usuario/admin',
        headers: { 'Authorization': `Bearer ${token}` },
        payload: {
          nome: 'Renato Oda',
          senha: 'abc123',
          email: 'renato.oda5@email.com.br',
          ativo: true
        }
      });

      expect(data.statusCode).to.equals(201);
      expect(data.result.id).to.exists();
      expect(data.result.nome).to.exists();
      expect(data.result.email).to.exists();
      expect(data.result.nome).to.equals('Renato Oda');
      expect(data.result.email).to.equals('renato.oda5@email.com.br');

      id = data.result.id;
    });

    it('Deve retornar um erro ao tentar cadastrar um usuário com um e-mail existente', async () => {
      const data = await server.inject({
        method: 'POST',
        url: '/v1/usuario',
        headers: { 'Authorization': `Bearer ${token}` },
        payload: {
          nome: 'Renato Oda',
          senha: 'abc123',
          email: 'renato.oda5@email.com.br',
          ativo: false
        }
      });

      expect(data.statusCode).to.equals(400);
    });

    it('Deve retornar erro ao tentar cadastrar um usuário com informações erradas na requisição', async () => {
      const data = await server.inject({
        method: 'POST',
        url: '/v1/usuario',
        headers: { 'Authorization': `Bearer ${token}` },
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

  describe('Consulta', () => {
    it('Deve retornar uma listagem de usuários', async () => {
      const data = await server.inject({
        method: 'GET',
        url: '/v1/usuario/admin',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      expect(data.statusCode).to.equals(200);
      expect(data.result).to.exists();
    });

    it('Deve retornar uma usuário pelo identificador', async () => {
      const data = await server.inject({
        method: 'GET',
        url: `/v1/usuario/admin/${id}`,
        headers: { 'Authorization': `Bearer ${token}` }
      });

      expect(data.statusCode).to.equals(200);
      expect(data.result).to.exists();
      expect(data.result.nome).to.exists();
      expect(data.result.email).to.exists();
      expect(data.result.nome).to.equals('Renato Oda');
      expect(data.result.email).to.equals('renato.oda5@email.com.br');
    });

    it('Deve retornar um 404 por não encontrar o usuário por um Identificador inválido', async () => {
      const data = await server.inject({
        method: 'GET',
        url: `/v1/usuario/admin/5b3b979780232d7e898d7d1b`,
        headers: { 'Authorization': `Bearer ${token}` }
      });

      expect(data.statusCode).to.equals(404);
      expect(data.result).to.exists();
    });
  });

  describe('Atualização', () => {
    it('Deve atualizar um usuário pelo identificador', async () => {
      const data = await server.inject({
        method: 'PUT',
        url: `/v1/usuario/admin/${id}`,
        headers: { 'Authorization': `Bearer ${token}` },
        payload: {
          nome: 'Oda',
          senha: 'novaSenha'
        }
      });

      expect(data.statusCode).to.equals(200);
      expect(data.result).to.exists();
      expect(data.result.nome).to.exists();
      expect(data.result.email).to.exists();
    });

    it('Deve validar se os dados do usuário foram atualizados', async () => {
      const data = await server.inject({
        method: 'GET',
        url: `/v1/usuario/admin/${id}`,
        headers: { 'Authorization': `Bearer ${token}` }
      });

      expect(data.statusCode).to.equals(200);
      expect(data.result).to.exists();
      expect(data.result.nome).to.exists();
      expect(data.result.email).to.exists();
      expect(data.result.nome).to.equals('Oda');
      expect(data.result.email).to.equals('renato.oda5@email.com.br');
    });
  });

  describe('Exclusão', () => {
    it('Deve excluir um usuário pelo identificador', async () => {
      const data = await server.inject({
        method: 'DELETE',
        url: `/v1/usuario/admin/${id}`,
        headers: { 'Authorization': `Bearer ${token}` }
      });

      expect(data.statusCode).to.equals(202);
      expect(data.result).to.exists();
    });

    it('Deve validar se os dados do usuário foram excluidos', async () => {
      const data = await server.inject({
        method: 'GET',
        url: `/v1/usuario/admin/${id}`,
        headers: { 'Authorization': `Bearer ${token}` }
      });

      expect(data.statusCode).to.equals(404);
    });
  });

});
