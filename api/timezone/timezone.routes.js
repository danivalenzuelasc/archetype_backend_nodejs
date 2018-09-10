// Load controller
const controllerTimezone = require('./timezone.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/timezone/:id', controllerTimezone.remove);
  app.get('/timezone', controllerTimezone.list);
  app.get('/timezone/search', controllerTimezone.search);
  app.get('/timezone/:id', controllerTimezone.view);
  app.post('/timezone', controllerTimezone.create);
  app.put('/timezone/:id', controllerTimezone.update);
};
