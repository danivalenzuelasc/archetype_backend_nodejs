// Se exportan las variables de las credenciales
module.exports = {
  mongodb: process.env.MONGO_URI || 'mongodb://localhost/integraciones_backend_cl',
  sentry: process.env.SENRTY_API_KEY || 'https://148f89e9a9a94e41a3409f1a9976bb91@sentry.io/1198884',
};
