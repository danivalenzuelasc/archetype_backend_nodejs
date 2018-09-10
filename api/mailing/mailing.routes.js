// Load controller
const controllerMailing = require('./mailing.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/mailing/:id', controllerMailing.remove);
  app.get('/mailing', controllerMailing.list);
  app.get('/mailing/listing', controllerMailing.listing);
  app.get('/mailing/search', controllerMailing.search);
  app.get('/mailing/:id', controllerMailing.view);
  app.get('/mailing/:id/send', controllerMailing.send);
  app.post('/mailing', controllerMailing.create);
  app.put('/mailing/:id', controllerMailing.update);
};
