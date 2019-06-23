// Declaracion de dependencias
const cryptr = require('cryptr');
const settings = require('./../config/settings');
const { getCredentials, getSummary, mapperDocument } = require('./sii');
const { users } = require('./../config/sii');

// Declaracion de mocks de pruebas
const { inputMapperDocument, outputMapperDocument } = require('./sii.mocks');

// Declaracion de variables auxiliares
const Cryptr = new cryptr(settings.endpoint.crypt);

// Configuracion del contador
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

/**
 * Pruebas del metodo getCredentials()
 */
test(`Prueba ${getCounter()} - Metodo getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials(Cryptr.decrypt(users[0].user), users[0].password, true);
  expect(Object.keys(response).length).toBeGreaterThan(0);
}, 10000);
test(`Prueba ${getCounter()} - Metodo getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials(Cryptr.decrypt(users[1].user), users[1].password, true);
  expect(Object.keys(response).length).toBeGreaterThan(0);
}, 10000);
test(`Prueba ${getCounter()} - Metodo getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials(Cryptr.decrypt(users[2].user), users[2].password, true);
  expect(Object.keys(response).length).toBeGreaterThan(0);
}, 10000);
test(`Prueba ${getCounter()} - Metodo getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials(Cryptr.decrypt(users[0].user), users[2].password, true);
  expect(Object.keys(response).length > 0).toEqual(false);
}, 10000);
test(`Prueba ${getCounter()} - Metodo getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials(Cryptr.decrypt(users[1].user), users[0].password, true);
  expect(Object.keys(response).length > 0).toEqual(false);
}, 10000);

/**
 * Pruebas del metodo getSummary()
 */
test(`Prueba ${getCounter()} - Metodo getSummary()`, async () => {
  counter += 1;
  const credentials = await getCredentials(Cryptr.decrypt(users[0].user), users[0].password, true);
  const response = await getSummary({
    session: {
      token: credentials.TOKEN,
    },
    user: `${credentials.RUT_NS}-${credentials.DV_NS}`,
  }, {
    operation: 'COMPRA',
    state: 'REGISTRO',
  }, '2019', '03');
  expect(response.length).toEqual(0);
}, 10000);
test(`Prueba ${getCounter()} - Metodo getSummary()`, async () => {
  counter += 1;
  const credentials = await getCredentials(Cryptr.decrypt(users[1].user), users[1].password, true);
  const response = await getSummary({
    session: {
      token: credentials.TOKEN,
    },
    user: `${credentials.RUT_NS}-${credentials.DV_NS}`,
  }, {
    operation: 'COMPRA',
    state: 'REGISTRO',
  }, '2019', '03');
  expect(response.length).toEqual(2);
}, 10000);
test(`Prueba ${getCounter()} - Metodo getSummary()`, async () => {
  counter += 1;
  const credentials = await getCredentials(Cryptr.decrypt(users[2].user), users[2].password, true);
  const response = await getSummary({
    session: {
      token: credentials.TOKEN,
    },
    user: `${credentials.RUT_NS}-${credentials.DV_NS}`,
  }, {
    operation: 'COMPRA',
    state: 'REGISTRO',
  }, '2019', '03');
  expect(response.length).toEqual(3);
}, 10000);
test(`Prueba ${getCounter()} - Metodo getSummary()`, async () => {
  counter += 1;
  const credentials = await getCredentials(Cryptr.decrypt(users[2].user), users[2].password, true);
  const response = await getSummary({
    session: {
      token: credentials.TOKEN,
    },
    user: `${credentials.RUT_NS}-${credentials.DV_NS}`,
  }, {
    operation: 'VENTA',
    state: 'REGISTRO',
  }, '2019', '03');
  expect(response.length).toEqual(2);
}, 10000);
test(`Prueba ${getCounter()} - Metodo getSummary()`, async () => {
  counter += 1;
  const credentials = await getCredentials(Cryptr.decrypt(users[1].user), users[1].password, true);
  const response = await getSummary({
    session: {
      token: credentials.TOKEN,
    },
    user: `${credentials.RUT_NS}-K`,
  }, {
    operation: 'COMPRA',
    state: 'REGISTRO',
  }, '2019', '03');
  expect(response.length).toEqual(0);
}, 10000);

/**
 * Pruebas del metodo mapperDocument()
 */
test(`Prueba ${getCounter()} - Metodo mapperDocument()`, async () => {
  counter += 1;
  const response = await mapperDocument(inputMapperDocument[0], 1, 'COMPRA', null, null);
  expect(response).toEqual(outputMapperDocument[0]);
}, 10000);
test(`Prueba ${getCounter()} - Metodo mapperDocument()`, async () => {
  counter += 1;
  const response = await mapperDocument(inputMapperDocument[1], 2, 'VENTA', null, null);
  expect(response).toEqual(outputMapperDocument[1]);
}, 10000);
test(`Prueba ${getCounter()} - Metodo mapperDocument()`, async () => {
  counter += 1;
  const response = await mapperDocument(inputMapperDocument[2], null);
  expect(response).toEqual(outputMapperDocument[2]);
}, 10000);
test(`Prueba ${getCounter()} - Metodo mapperDocument()`, async () => {
  counter += 1;
  const response = await mapperDocument(inputMapperDocument[3]);
  expect(response).toEqual(outputMapperDocument[3]);
}, 10000);
test(`Prueba ${getCounter()} - Metodo mapperDocument()`, async () => {
  counter += 1;
  const response = await mapperDocument();
  expect(response).toEqual({});
}, 10000);
