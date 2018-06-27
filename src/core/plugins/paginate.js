'use strict';

module.exports = {
  register: async (server, options) => {
    const limitDefault = options.limit || 15;

    const limit = () => ( this.query.limit || limitDefault );

    const offset = () => {
      const page = this.query.page || 1;
      if (page) {
        return limit.call(this) * (page - 1);
      }

      return 0;
    };

    return await server.decorate('request', 'pagination', { limit, offset });
  },
  name: 'hapi-paginate',
  version: '1.0.0'
};
