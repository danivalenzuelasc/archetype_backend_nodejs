// Declaracion de dependencias
const app = require('./../app');
const collections = require('./../api/collections');

// Se inicializa el servidor
app.listen(() => {
  console.info('[Comienzo] Eliminando registros de prueba');
  console.info('...');
  const promises = [];
  Object.keys(collections()).forEach((collection) => {
    const promise = new Promise((resolve, reject) => {
      collections()[collection].model.deleteMany({})
        .then(() => {
          console.info(`-> Eliminando datos de prueba de la colección '${collection}'`);
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
    promises.push(promise);
  });
  Promise.all(promises).then(() => {
    console.info('...');
    console.info('[Termino] Eliminando registros de prueba');
    process.exit(0);
  });
});
