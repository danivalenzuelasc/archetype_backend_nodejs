// Load controller
const controllerPhone = require('./phone.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/phone/:id', controllerPhone.remove);
  app.get('/phone', controllerPhone.list);
  app.get('/phone/search', controllerPhone.search);
  app.get('/phone/:id', controllerPhone.view);
  app.post('/phone', controllerPhone.create);
  app.put('/phone/:id', controllerPhone.update);
};
