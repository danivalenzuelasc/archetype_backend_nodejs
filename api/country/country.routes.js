// Load controller
const controllerCountry = require('./country.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/country/:id', controllerCountry.remove);
  app.get('/country', controllerCountry.list);
  app.get('/country/listing', controllerCountry.listing);
  app.get('/country/search', controllerCountry.search);
  app.get('/country/:id', controllerCountry.view);
  app.get('/country/:id/normalize', controllerCountry.normalize);
  app.post('/country', controllerCountry.create);
  app.put('/country/:id', controllerCountry.update);
};
