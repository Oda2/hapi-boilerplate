'use strict';

/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

const Promise = require('bluebird');
const path = require('path');
const Server = require('./server');
const { filterProduction, filterCoreDirectories } = require('./utils/core-function');

const fs = Promise.promisifyAll(require('fs'));

console.log(`Running enviroment ${process.env.NODE_ENV || 'dev'}`);

// Pega no process exceções inesperadas
process.on('uncaughtException', (error) => {
  console.error(`uncaughtException ${error.message}`);
});

// Promessas rejeitadas
process.on('unhandledRejection', (reason) => {
  console.error(`unhandledRejection ${reason}`);
});

// Desliga "carinhosamente" a aplicação
process.on('SIGTERM', shutdown);

const start = async () => {
  try {
    const server = await Server.init();

    await corePlugins(server);
    await routerPlugins(server);

    if (process.env.NODE_ENV === 'test') {
      return server;
    }

    await server.start();
    console.log('Server running at:', server.info.uri);
  } catch (err) {
    console.error('===> Error starting server: ', err.message);
    throw err;
  }
};

const corePlugins = async (server) => {
  console.log('===> load core plugins');
  try {
    const dir = path.join(__dirname, '/plugins');
    const plugins = fs.readdirSync(dir).filter(filterProduction);

    let pluginPromises = [];

    plugins.forEach((pluginName) => {
      const plugin = require(path.join(dir, pluginName));
      pluginPromises.push(server.register(plugin));
    });

    return await Promise.all(pluginPromises);
  } catch (err) {
    console.log('==> Error load core plugins', err);
    throw err;
  }
};

const routerPlugins = async (server) => {
  console.log('===> load plugins routes');
  try {
    const dir = path.join(__dirname, '..');
    const routers = fs.readdirSync(dir).filter(filterCoreDirectories);

    let corePromises = [];

    routers.forEach((routerName) => {
      const plugin = require(path.join(dir, routerName));
      corePromises.push(server.register(plugin));
    });

    return await Promise.all(corePromises);
  } catch (err) {
    console.log('===> Error load plugins routes', err);
    throw err;
  }
};

module.exports = { start };

function shutdown () {
  console.log('shutting down');
  process.exit();
}
