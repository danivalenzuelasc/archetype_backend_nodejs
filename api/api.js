// Declare dependencies
const collections = require('./collections');

// Setting API
module.exports = (app) => {
  Object.keys(collections()).forEach((collection) => {
    require(`./${collections()[collection].router.root}/${collections()[collection].router.path}/${collections()[collection].router.root}_${collections()[collection].router.path}.model`);
    require(`./${collections()[collection].router.root}/${collections()[collection].router.path}/${collections()[collection].router.root}_${collections()[collection].router.path}.routes`)(app);
  });
  return app;
};
