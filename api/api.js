// Declare dependencies
const collections = require('./collections');

// Setting API
module.exports = (app) => {
  Object.keys(collections()).forEach((collection) => {
    require(`./${collection}/${collection}.model`);
    require(`./${collection}/${collection}.routes`)(app);
  });
  return app;
};
