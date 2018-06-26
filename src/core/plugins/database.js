'use strict';

/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const { getDatabase } = require('../utils/load');

module.exports = {
  register: async (server) => {
    try {
      const getFiles = (dirRoot) => {
        return fs.readdirSync(dirRoot)
          .map((entity) => {
            return path.join(dirRoot, entity);
          });
      };

      const config = getDatabase();
  
      mongoose.Promise = require('bluebird');
      mongoose.connect(config.host);
      let database = mongoose.connection;
      await new Promise((resolve, reject) => {
        database.on('error', (err) => {
          console.error(`connection error: ${err}`);
          return reject(err);
        });
  
        database.once('open', () => {
          const _basePath = path.join(__dirname, '../../models');
          const _files = getFiles(_basePath);
          _.forEach(_files, (file) => ( require(file) ));
          return resolve();
        });
      });
  
      return await server.decorate('request', 'database', database);
    } catch (err) {
      console.log('==> Error load Database', err);
      throw err;
    }
  },
  name: 'database',
  version: '1.0.0'
};
