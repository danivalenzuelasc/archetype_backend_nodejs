// Declaracion de dependencias
const controllerSiiDocument = require('./sii_document.controller');

// Se exportan las rutas del endpoint
module.exports = (app) => {
  app.delete('/sii/document/:id', controllerSiiDocument.remove);
  app.get('/sii/document', controllerSiiDocument.list);
  app.get('/sii/document/:id', controllerSiiDocument.view);
  app.post('/sii/document', controllerSiiDocument.create);
  app.post('/sii/document/multiple', controllerSiiDocument.multipleCreate);
  // app.put('/sii/document/multiple', controllerSiiDocument.multipleUpdate);
  app.put('/sii/document/:id', controllerSiiDocument.update);
};
