// Declaracion de dependencias
const controllerSiiAudit = require('./sii_audit.controller');

// Se exportan las rutas del endpoint
module.exports = (app) => {
  app.delete('/sii/audit/:id', controllerSiiAudit.remove);
  app.get('/sii/audit', controllerSiiAudit.list);
  app.get('/sii/audit/:id', controllerSiiAudit.view);
  app.post('/sii/audit', controllerSiiAudit.create);
  app.put('/sii/audit/:id', controllerSiiAudit.update);
};
