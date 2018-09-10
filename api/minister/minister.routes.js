// Load controller
const controllerMinister = require('./minister.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/minister/:id', controllerMinister.remove);
  app.get('/minister', controllerMinister.list);
  app.get('/minister/search', controllerMinister.search);
  app.get('/minister/:id', controllerMinister.view);
  app.post('/minister', controllerMinister.create);
  app.put('/minister/:id', controllerMinister.update);
};
