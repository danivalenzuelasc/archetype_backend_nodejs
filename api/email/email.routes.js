// Load controller
const controllerEmail = require('./email.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/email/:id', controllerEmail.remove);
  app.get('/email', controllerEmail.list);
  app.get('/email/search', controllerEmail.search);
  app.get('/email/:id', controllerEmail.view);
  app.post('/email', controllerEmail.create);
  app.put('/email/:id', controllerEmail.update);
};
