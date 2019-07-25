// Se declaran las dependencias
const settings = require('./settings');

// Se exportan las variables de las credenciales
module.exports = {
  mongodb: process.env.MONGO_URI ||
    process.env.NODE_ENV === 'production'
    ? `mongodb+srv://${settings.mongo.production.user}:${settings.mongo.production.password}@${settings.mongo.production.server}`
    : process.env.NODE_ENV === 'certification'
      ? `mongodb+srv://${settings.mongo.certification.user}:${settings.mongo.certification.password}@${settings.mongo.certification.server}`
      : process.env.NODE_ENV === 'release'
        ? `mongodb+srv://${settings.mongo.release.user}:${settings.mongo.release.password}@${settings.mongo.release.server}`
        : process.env.NODE_ENV === 'development'
          ? `mongodb+srv://${settings.mongo.development.user}:${settings.mongo.development.password}@${settings.mongo.development.server}`
          : 'mongodb://localhost/integraciones_backend_cl',
  sentry: process.env.SENRTY_API_KEY || 'https://ceadbc8659fb4e9ba5eb1bb39873665d@sentry.io/1485189',
};
