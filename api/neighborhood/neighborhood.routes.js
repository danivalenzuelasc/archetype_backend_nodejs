// Load controller
const controllerNeighborhood = require('./neighborhood.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/neighborhood/:id', controllerNeighborhood.remove);
  app.get('/neighborhood', controllerNeighborhood.list);
  app.get('/neighborhood/listing', controllerNeighborhood.listing);
  app.get('/neighborhood/search', controllerNeighborhood.search);
  app.get('/neighborhood/:id', controllerNeighborhood.view);
  app.get('/neighborhood/:id/normalize', controllerNeighborhood.normalize);
  app.post('/neighborhood', controllerNeighborhood.create);
  app.put('/neighborhood/:id', controllerNeighborhood.update);
};
