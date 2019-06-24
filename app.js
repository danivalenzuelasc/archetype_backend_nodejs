// Declaracion de dependencias
const bodyParser = require('body-parser');
const credentials = require('./config/credentials');
const express = require('express');
const expressPrettify = require('express-prettify');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const sentry = require('@sentry/node');
const settings = require('./config/settings');
mongoose.Promise = require('bluebird');

// Metodo para forzar la conexion por HTTPS (Protocolo SSL)
const forceSsl = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

// Configuracion con SentryIO
sentry.init({
  dsn: credentials.sentry,
  environment: process.env.NODE_ENV || 'development',
});

// Configuracion con MongoDB
mongoose.connect(credentials.mongodb, {
  autoCreate: true,
  autoIndex: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
});
mongoose.connection.on('error', (error) => {
  sentry.captureException(error);
  process.exit(-1);
});

// Configuracion del servidor
const app = express();
app.timeout = 0;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(expressPrettify({
  query: 'pretty',
}));
app.use(methodOverride());
if (process.env.NODE_ENV === 'production') {
  app.use(forceSsl);
}
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Configuracion de las rutas endpoints
require('./api/api')(app);

// Configuracion de las paginas estaticas de la arquitectura
app.use(express.static(`${__dirname}/public`));
require('./public/index.routes').default(app);

// Se inicializa el servidor
function random() {
  let port;
  do {
    port = Math.floor((Math.random() * 10000) + 1);
  }
  while (port === settings.port || port === 4001 || port === 4002 || port < 4000 || port > 10000);
  return port;
}
let serverPort;
switch (process.env.NODE_ENV) {
  case 'pretest':
    serverPort = 4001;
    break;
  case 'seed':
    serverPort = 4002;
    break;
  case 'testing':
    serverPort = random();
    break;
  default:
    serverPort = settings.port;
}
app.listen(serverPort, () => {
  // Se inicializan los demonios de la arquitectura
  require('./api/schedule').init();
});

// Se exporta la configuracion del servidor
module.exports = app;
