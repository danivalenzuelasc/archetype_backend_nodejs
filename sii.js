// Declaracion de dependencias
const cryptr = require('cryptr');
const settings = require('./config/settings');
const {
  getCredentials, getDTE,
} = require('./utils/sii');
const { users } = require('./config/sii');

// Declaracion de variables auxiliares
const Cryptr = new cryptr(settings.endpoint.crypt);

getCredentials(Cryptr.decrypt(users[1].user), users[1].password, true)
  .then((credentials) => {
    getDTE({
      session: {
        token: credentials.TOKEN,
      },
      user: `${credentials.RUT_NS}-${credentials.DV_NS}`,
    }, {
      business: {
        dv: '8',
        rut: 76619657,
      },
      document: {
        codes: {
          dcv: 87658113,
          det: 1740998527,
        },
        codeSII: 33,
        operation: 'VENTA',
        period: 201907,
        shippingIdentifier: 3821394658,
      },
    })
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
