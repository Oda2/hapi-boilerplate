'use strict';

const dotenv = require('dotenv');

dotenv.load({ silent: true });

const getServer = () => ({
  host: process.env.HOST || process.env['SERVER_HOST'],
  port: process.env.PORT || process.env['SERVER_PORT'] || '4000'
});

const getDatabase = () => ({ host: process.env.DATABASE || process.env['DATABASE'] || 'mongodb://localhost:27017' });

const getKeyAuth = () => ({ key: process.env.KEYAUTH || 'bbEight' });

module.exports = {
  getServer,
  getDatabase,
  getKeyAuth
};
