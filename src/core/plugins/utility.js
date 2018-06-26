'use strict';

const _ = require('lodash');

module.exports = {
  register: async (server) => {
    const loadRoutes = async (routes) => {
      let registerRoutes = _.map(routes, (route) => {
        const env = process.env['NODE_ENV'] || 'development';

        const _options = {
          plugin: require(route),
          // options: { database: db },
          routes: {
            prefix: '/v1'
          }
        };

        if (env === 'production') {
          _options.routes.vhost = 'api';
        }

        return _options;
      });

      return await server.register(registerRoutes);
    };

    // await server.method('loadModels', loadModels);
    await server.method('loadRoutes', loadRoutes);
  },
  name: 'utility',
  version: '1.0.0'
};
