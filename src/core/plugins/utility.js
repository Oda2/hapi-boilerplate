'use strict';

const _ = require('lodash');

module.exports = {
  register: async (server) => {
    const loadRoutes = async (routes) => {
      let registerRoutes = _.map(routes, (route) => {
        const env = process.env['NODE_ENV'] || 'development';

        const _options = {
          plugin: require(route),
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

    await server.method('loadRoutes', loadRoutes);

    await server.register({
      plugin: require('hapi-boom-decorators')
    });
  },
  name: 'utility',
  version: '1.0.0'
};
