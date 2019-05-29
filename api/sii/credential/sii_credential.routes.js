// Load controller
const controllerSiiCredential = require('./sii_credential.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/sii/credential/:id', controllerSiiCredential.remove);
  app.get('/sii/credential', controllerSiiCredential.list);
  app.get('/sii/credential/:id', controllerSiiCredential.view);
  app.post('/sii/credential', controllerSiiCredential.create);
  app.put('/sii/credential/:id', controllerSiiCredential.update);
};
