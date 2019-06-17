// Declaracion de dependencias
const cryptr = require('cryptr');
const settings = require('./../config/settings');
const { getCredentials, mapperDocument } = require('./sii');
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
  const response = await getCredentials(users[0].user, Cryptr.encrypt(users[0].password), true);
  expect(Object.keys(response).length).toBeGreaterThan(0);
}, 10000);
test(`Prueba ${getCounter()} - Metodo getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials(users[1].user, Cryptr.encrypt(users[1].password), true);
  expect(Object.keys(response).length).toBeGreaterThan(0);
}, 10000);
test(`Prueba ${getCounter()} - Metodo getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials(users[2].user, Cryptr.encrypt(users[2].password), true);
  expect(Object.keys(response).length).toBeGreaterThan(0);
}, 10000);
test(`Prueba ${getCounter()} - Metodo getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials(users[0].user, Cryptr.encrypt(users[2].password), true);
  expect(Object.keys(response).length > 0).toEqual(false);
}, 10000);
test(`Prueba ${getCounter()} - Metodo getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials('1-2', 'bb5ca2dbd534f6a94c7267579fd6259f6db0a0e2ab8dfef797ae', true);
  expect(Object.keys(response).length > 0).toEqual(false);
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
