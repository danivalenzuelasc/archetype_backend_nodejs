// Load controller
const controllerState = require('./state.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/state/:id', controllerState.remove);
  app.get('/state', controllerState.list);
  app.get('/state/listing', controllerState.listing);
  app.get('/state/search', controllerState.search);
  app.get('/state/:id', controllerState.view);
  app.get('/state/:id/normalize', controllerState.normalize);
  app.post('/state', controllerState.create);
  app.put('/state/:id', controllerState.update);
};
