// Declaracion de dependencias
const controllerSiiCredential = require('./sii_credential.controller');

// Se exportan las rutas del endpoint
module.exports = (app) => {
  app.delete('/sii/credential/:id', controllerSiiCredential.remove);
  app.delete('/sii/credential/delete/:user', controllerSiiCredential.delete);
  app.get('/sii/credential', controllerSiiCredential.list);
  app.get('/sii/credential/:id', controllerSiiCredential.view);
  app.post('/sii/credential', controllerSiiCredential.create);
  app.post('/sii/credential/verify', controllerSiiCredential.verify);
  app.put('/sii/credential/:id', controllerSiiCredential.update);
};
