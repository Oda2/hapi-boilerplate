'use strict';

const Hapi = require('hapi');

const { getServer } = require('./utils/load');

const init = async () => {
  const config = getServer();
  try {
    const server = await new Hapi.Server({
      port: config.port,
      host: config.host
    });

    return server;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  init
};
