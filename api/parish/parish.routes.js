// Load controller
const controllerParish = require('./parish.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/parish/:id', controllerParish.remove);
  app.get('/parish', controllerParish.list);
  app.get('/parish/search', controllerParish.search);
  app.get('/parish/:id', controllerParish.view);
  app.post('/parish', controllerParish.create);
  app.put('/parish/:id', controllerParish.update);
};
