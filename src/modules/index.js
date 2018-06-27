'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'modules',
  version: '1.0.0',
  register: async (server) => {
    await server.methods.loadRoutes(_.compact(getFiles('routes.js', 'public')));
    await server.methods.loadRoutes(_.compact(getFiles('routes.js', 'admin')));
  }
};

function getFiles (type, level) {
  const basePath = __dirname;
  return fs.readdirSync(basePath)
    .map((entity) => {
      if (level) {
        let file = path.join(basePath, entity + '/' + level, entity.split('-').join('.') + '.' + level + '.' + type);
        if (!isFile(file)) {
          return;
        }
        return file;
      } else {
        let root = path.join(basePath, entity, type);
        if (!isFile(root)) {
          return;
        }
        return root;
      }
    });
}

function isFile (root) {
  try {
    return fs.statSync(root).isFile();
  } catch (err) {
    return false;
  }
}
