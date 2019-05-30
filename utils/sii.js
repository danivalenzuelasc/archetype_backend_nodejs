// Declare dependencies
const request = require('request');

// Export function getCredentials()
exports.getCredentials = (dni, password) => {
  if (process.env.NODE_ENV === 'production') {
    return new Promise((resolve, reject) => {
      request.post({
        form: {
          clave: password,
          dv: dni.replace(/\./g, '').split('-')[1],
          referencia: 'https://misiir.sii.cl/cgi_misii/siihome.cgi',
          rut: dni.replace(/\./g, '').split('-')[0],
          rutcntr: dni,
        },
        url: 'https://zeusr.sii.cl/cgi_AUT2000/CAutInicio.cgi',
      }, (error, response) => {
        if (!error && response && response.headers && response.headers['set-cookie']) {
          const list = {};
          response.headers['set-cookie'].forEach((cookie) => {
            try {
              const aux0 = cookie.split(';')[0].split('=')[0];
              const aux1 = cookie.split(';')[0].split('=')[1];
              list[aux0] = aux1;
            } catch (errorCookie) {
              reject(errorCookie);
            }
          });
          resolve(list);
        } else {
          reject(error);
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
