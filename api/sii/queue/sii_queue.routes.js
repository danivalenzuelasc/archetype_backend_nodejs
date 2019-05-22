// Load controller
const controllerSiiQueue = require('./sii_queue.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/sii/queue/:id', controllerSiiQueue.remove);
  app.get('/sii/queue', controllerSiiQueue.list);
  app.get('/sii/queue/:id', controllerSiiQueue.view);
  app.post('/sii/queue', controllerSiiQueue.create);
  app.put('/sii/queue/:id', controllerSiiQueue.update);
};
