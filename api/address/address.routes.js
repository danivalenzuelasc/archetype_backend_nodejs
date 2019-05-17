// Load controller
const controllerAddress = require('./address.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/address/:id', controllerAddress.remove);
  app.get('/address', controllerAddress.list);
  app.get('/address/search', controllerAddress.search);
  app.get('/address/:id', controllerAddress.view);
  app.post('/address', controllerAddress.create);
  app.put('/address/:id', controllerAddress.update);
};
