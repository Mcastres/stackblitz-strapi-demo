module.exports = {
  // accessible only from admin UI
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/preview',
      handler: 'preview.getPreviewUrl',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};
