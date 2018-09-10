// Load controller
const controllerContact = require('./contact.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/contact/:id', controllerContact.remove);
  app.get('/contact', controllerContact.list);
  app.get('/contact/search', controllerContact.search);
  app.get('/contact/:id', controllerContact.view);
  app.post('/contact', controllerContact.create);
  app.put('/contact/:id', controllerContact.update);
};
