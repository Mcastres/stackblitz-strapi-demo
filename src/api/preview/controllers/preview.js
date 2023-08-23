'use strict';

module.exports = {
  getPreviewUrl(ctx) {
    ctx.body = {
      url: process.env.STRAPI_ADMIN_CLIENT_URL || 'http://localhost:3000',
    };
  },
};
