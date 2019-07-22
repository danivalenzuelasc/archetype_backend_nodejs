// Se exportan las variables de las credenciales
module.exports = {
  mongodb: process.env.MONGO_URI ||
    process.env.NODE_ENV === 'production'
    ? 'mongodb+srv://root:WPm8nKdA6kkT11uP@nubox-matrix-dev-ugnk2.mongodb.net/integraciones_backend_cl?retryWrites=true&w=majority'
    : process.env.NODE_ENV === 'certification'
      ? 'mongodb+srv://root:WPm8nKdA6kkT11uP@nubox-matrix-dev-ugnk2.mongodb.net/integraciones_backend_cl?retryWrites=true&w=majority'
      : process.env.NODE_ENV === 'release'
        ? 'mongodb+srv://root:WPm8nKdA6kkT11uP@nubox-matrix-dev-ugnk2.mongodb.net/integraciones_backend_cl?retryWrites=true&w=majority'
        : process.env.NODE_ENV === 'development'
          ? 'mongodb+srv://root:WPm8nKdA6kkT11uP@nubox-matrix-dev-ugnk2.mongodb.net/integraciones_backend_cl?retryWrites=true&w=majority'
          : 'mongodb://localhost/integraciones_backend_cl',
  sentry: process.env.SENRTY_API_KEY || 'https://ceadbc8659fb4e9ba5eb1bb39873665d@sentry.io/1485189',
};
