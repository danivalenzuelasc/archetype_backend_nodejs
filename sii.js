// Declaracion de dependencias
const cryptr = require('cryptr');
const settings = require('./config/settings');
const {
  getCredentials, getDocuments, getSummary,
} = require('./utils/sii');
const { users } = require('./config/sii');

// Declaracion de variables auxiliares
const Cryptr = new cryptr(settings.endpoint.crypt);

getCredentials(Cryptr.decrypt(users[1].user), users[1].password, true)
    .then((credentials) => {
      getSummary({
        session: {
          token: credentials.TOKEN,
        },
        user: `${credentials.RUT_NS}-K`,
      }, {
        operation: 'COMPRA',
        state: 'REGISTRO',
      }, '2019', '03')
        .then((response) => {
          console.info(response);
        })
        .catch((error) => {
          console.info(error);
        });
    })
    .catch((error) => {
      console.info(error);
    });
