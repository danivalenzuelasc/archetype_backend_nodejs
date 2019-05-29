// Load controller
const controllerSiiDocument = require('./sii_document.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/sii/document/:id', controllerSiiDocument.remove);
  app.get('/sii/document', controllerSiiDocument.list);
  app.get('/sii/document/:id', controllerSiiDocument.view);
  app.post('/sii/document', controllerSiiDocument.create);
  app.put('/sii/document/:id', controllerSiiDocument.update);
};
