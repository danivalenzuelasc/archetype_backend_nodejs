// Se exportan las variables globales de la aplicacion
module.exports = {
  api: 'http://localhost',
  endpoint: {
    crypt: process.env.CRYPT || '$&mHn5qbc75J}c>',
    hashing: process.env.HASHING || 43200000,
    limit: process.env.LIMIT || 500,
  },
  port: process.env.PORT || 4000,
  windowsService: 'E:\\Nubox\\integraciones_backend_cl\\app.js',
};
