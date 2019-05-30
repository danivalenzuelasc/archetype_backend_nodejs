// Declare dependencies
const cryptr = require('cryptr');
const request = require('request-promise');
const settings = require('./../config/settings');
const Cryptr = new cryptr(settings.endpoint.crypt);

// Export function getCredentials()
exports.getCredentials = (dni, password, test = false) => {
  if (process.env.NODE_ENV === 'production' || test) {
    return new Promise((resolve) => {
      const options = {
        form: {
          clave: Cryptr.decrypt(password),
          dv: dni.replace(/\./g, '').split('-')[1],
          referencia: 'https://misiir.sii.cl/cgi_misii/siihome.cgi',
          rut: dni.replace(/\./g, '').split('-')[0],
          rutcntr: dni,
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        json: true,
        method: 'POST',
        resolveWithFullResponse: true,
        uri: 'https://zeusr.sii.cl/cgi_AUT2000/CAutInicio.cgi',
      };
      request(options)
        .then((response) => {
          if (response && response.headers && response.headers['set-cookie']) {
            const list = {};
            response.headers['set-cookie'].forEach((cookie) => {
              const aux0 = cookie.split(';')[0].split('=')[0];
              const aux1 = cookie.split(';')[0].split('=')[1];
              list[aux0] = aux1;
            });
            resolve(list);
          } else {
            resolve({});
          }
        });
    });
  }
  return new Promise((resolve, reject) => {
    if (dni === null || password === null) {
      reject(new Error(''));
    } else {
      resolve({});
    }
  });
};
