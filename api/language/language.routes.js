// Load controller
const controllerLanguage = require('./language.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/language/:id', controllerLanguage.remove);
  app.get('/language', controllerLanguage.list);
  app.get('/language/search', controllerLanguage.search);
  app.get('/language/:id', controllerLanguage.view);
  app.post('/language', controllerLanguage.create);
  app.put('/language/:id', controllerLanguage.update);
};
