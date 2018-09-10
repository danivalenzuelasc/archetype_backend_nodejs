// Load controller
const controllerUser = require('./user.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/user/:id', controllerUser.remove);
  app.get('/user', controllerUser.list);
  app.get('/user/search', controllerUser.search);
  app.get('/user/:id', controllerUser.view);
  app.post('/user', controllerUser.create);
  app.put('/user/:id', controllerUser.update);
};
