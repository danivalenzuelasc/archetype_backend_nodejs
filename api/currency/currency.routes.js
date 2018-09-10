// Load controller
const controllerCurrency = require('./currency.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/currency/:id', controllerCurrency.remove);
  app.get('/currency', controllerCurrency.list);
  app.get('/currency/search', controllerCurrency.search);
  app.get('/currency/:id', controllerCurrency.view);
  app.post('/currency', controllerCurrency.create);
  app.put('/currency/:id', controllerCurrency.update);
};
