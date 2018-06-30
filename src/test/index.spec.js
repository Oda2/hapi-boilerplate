'use strict';

const Lab = require('lab');
const Code = require('code');
const bootstrap = require('../core/bootstrap');
const factory = require('./factory.usuario');

const lab = exports.lab = Lab.script();

global.expect = Code.expect;

global.it = lab.it;
global.before = lab.before;
global.beforeEach = lab.beforeEach;
global.after = lab.after;
global.describe = lab.describe;

global.describe('===> load the bootstrap', () => {
  global.before(async () => {
    console.log('===> server executed');
    try {
      const server = await bootstrap.start();
      global.server = server;
    } catch (err) {
      throw err;
    }
  });

  global.it('===> load server finalized', () => {
    global.expect(global.server).to.exist();
  });

  global.it('===> Create user test', async () => {
    const usuario = await factory.criarUsuario(global.server);
    global.expect(usuario).to.exist();;
    global.expect(usuario.statusCode).to.equals(201);
  });
});
