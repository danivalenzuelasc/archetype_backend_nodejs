// Declaracion de dependencias
const controllerSiiQueue = require('./sii_queue.controller');

// Se exportan las rutas del endpoint
module.exports = (app) => {
  app.delete('/sii/queue/:id', controllerSiiQueue.remove);
  app.get('/sii/queue', controllerSiiQueue.list);
  app.get('/sii/queue/sync', controllerSiiQueue.sync);
  app.get('/sii/queue/:id', controllerSiiQueue.view);
  app.post('/sii/queue', controllerSiiQueue.create);
  app.put('/sii/queue/:id', controllerSiiQueue.update);
};
