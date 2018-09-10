// Load controller
const controllerPermission = require('./permission.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/permission/:id', controllerPermission.remove);
  app.get('/permission', controllerPermission.list);
  app.get('/permission/search', controllerPermission.search);
  app.get('/permission/:id', controllerPermission.view);
  app.post('/permission', controllerPermission.create);
  app.put('/permission/:id', controllerPermission.update);
};
