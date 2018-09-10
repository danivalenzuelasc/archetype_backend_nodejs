// Declare dependencies
const app = require('./../app');
const collections = require('./../api/collections');
const csvjson = require('csvjson');
const fs = require('fs');
const path = require('path');

// Run server
app.listen(() => {
  console.info('[Comienzo] Incorporando datos de producción');
  console.info('...');
  const promises = [];
  Object.keys(collections()).forEach((collection) => {
    if (Object.prototype.hasOwnProperty.call(collections()[collection], 'import') && collections()[collection].import) {
      const promise = new Promise((resolve, reject) => {
        collections()[collection].model.find({}).remove()
          .then(() => {
            console.info(`-> Eliminando datos de la colección '${collection}'`);
            const route = fs.readFileSync(path.join(__dirname, `./../api/${collection}/${collection}.seed.csv`), { encoding : 'utf8' });
            const seed = csvjson.toSchemaObject(route, {
              delimiter: ',',
              quote: '"'
            });
            if (seed && Array.isArray(seed)) {
              return collections()[collection].model.create(seed)
                .then(() => {
                  console.info(`-> Ingresando datos de la colección '${collection}'`);
                  resolve();
                })
                .catch((error) => {
                  console.info(error);
                  reject(error);
                });
            }
          })
          .catch((error) => {
            console.info(error);
            reject(error);
          });
      });
      promises.push(promise);
    }
  });
  Promise.all(promises).then(() => {
    console.info('...');
    console.info('[Termino] Incorporando datos de producción');
    process.exit(0);
  });
});
