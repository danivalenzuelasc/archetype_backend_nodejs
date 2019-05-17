// Declare dependencies
const bodyParser = require('body-parser');
const express = require('express');
const expressPrettify = require('express-prettify');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const raven = require('raven');
const credentials = require('./config/credentials');
const settings = require('./config/settings');
mongoose.Promise = require('bluebird');

// Function Force SSL
const forceSsl = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

// Config Sentry.io
if (process.env.NODE_ENV === 'production') {
  raven.config(credentials.sentry, {
    environment: process.env.NODE_ENV,
  }).install();
}

// Connect to database MongoDB
mongoose.connect(credentials.mongodb, {
  autoIndex: false,
  useFindAndModify: false,
  useNewUrlParser: true,
});
mongoose.connection.on('error', (error) => {
  raven.captureException(error);
  process.exit(-1);
});

// Config server Express
const app = express();
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

// Setting routes
require('./api/api')(app);

// Setting static pages
app.use(express.static(`${__dirname}/public`));
require('./public/index.routes').default(app);

// Run server
function random() {
  let port;
  do {
    port = Math.floor((Math.random() * 10000) + 1);
  }
  while (port === settings.port || port === 4001 || port === 4002 || port < 2000 || port > 10000);
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
  // Run Schedule Jobs (without Testing)
  if (process.env.NODE_ENV === 'production') {
    require('./api/schedule').init();
  }
});

// Export server
module.exports = app;
