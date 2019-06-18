// Se exportan las variables de las credenciales
module.exports = {
  mongodb: process.env.MONGO_URI || 'mongodb://localhost/integraciones_backend_cl',
  sentry: process.env.SENRTY_API_KEY || 'https://ceadbc8659fb4e9ba5eb1bb39873665d@sentry.io/1485189',
};
