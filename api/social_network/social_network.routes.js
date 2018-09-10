// Load controller
const controllerSocialNetwork = require('./social_network.controller');

// Export routes endpoint
module.exports = (app) => {
  app.delete('/social_network/:id', controllerSocialNetwork.remove);
  app.get('/social_network', controllerSocialNetwork.list);
  app.get('/social_network/search', controllerSocialNetwork.search);
  app.get('/social_network/:id', controllerSocialNetwork.view);
  app.post('/social_network', controllerSocialNetwork.create);
  app.put('/social_network/:id', controllerSocialNetwork.update);
};
