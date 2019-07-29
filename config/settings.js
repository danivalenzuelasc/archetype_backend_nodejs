// Se exportan las variables globales de la aplicacion
module.exports = {
  api: 'http://localhost',
  endpoint: {
    crypt: process.env.CRYPT || '$&mHn5qbc75J}c>',
    hashing: process.env.HASHING || 43200000,
    limit: process.env.LIMIT || 100,
  },
  mongo: {
    certification: {
      password: '',
      server: '',
      user: '',
    },
    development: {
      password: 'WPm8nKdA6kkT11uP',
      server: 'nubox-matrix-dev-ugnk2.mongodb.net/integraciones_backend_cl?retryWrites=true&w=majority',
      user: 'root',
    },
    production: {
      password: '',
      server: '',
      user: '',
    },
    release: {
      password: '',
      server: '',
      user: '',
    },
  },
  port: process.env.PORT || 4000,
  windowsService: 'E:\\Nubox\\integraciones_backend_cl\\app.js',
};
