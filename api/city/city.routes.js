// Load controller
const controllerCity = require('./city.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/city/:id', controllerCity.remove);
  app.get('/city', controllerCity.list);
  app.get('/city/listing', controllerCity.listing);
  app.get('/city/search', controllerCity.search);
  app.get('/city/:id', controllerCity.view);
  app.get('/city/:id/normalize', controllerCity.normalize);
  app.post('/city', controllerCity.create);
  app.put('/city/:id', controllerCity.update);
};
