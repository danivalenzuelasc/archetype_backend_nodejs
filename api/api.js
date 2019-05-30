// Declaracion de dependencias
const collections = require('./collections');

// Se exporta la configuracion de las rutas de los diversos endpoints
module.exports = (app) => {
  Object.keys(collections()).forEach((collection) => {
    const { router } = collections()[collection];
    require(`./${router.root}/${router.path}/${router.root}_${router.path}.model`);
    require(`./${router.root}/${router.path}/${router.root}_${router.path}.routes`)(app);
  });
  return app;
};
