// Declare dependencies
const cryptr = require('cryptr');
const settings = require('./../config/settings');
const { getCredentials, mapperDocument } = require('./sii');
const { users } = require('./../config/sii');

// Declare mocks spec
const { inputMapperDocument, outputMapperDocument } = require('./sii.mocks');

// Declaracion de variables auxiliares
const Cryptr = new cryptr(settings.endpoint.crypt);

// Setting counter
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

/** Testing function getCredentials
 */
test(`Testing ${getCounter()} - Function getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials(users[0].user, Cryptr.encrypt(users[0].password), true);
  expect(Object.keys(response).length).toBeGreaterThan(0);
}, 10000);
test(`Testing ${getCounter()} - Function getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials(users[1].user, Cryptr.encrypt(users[1].password), true);
  expect(Object.keys(response).length).toBeGreaterThan(0);
}, 10000);
test(`Testing ${getCounter()} - Function getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials(users[2].user, Cryptr.encrypt(users[2].password), true);
  expect(Object.keys(response).length).toBeGreaterThan(0);
}, 10000);
test(`Testing ${getCounter()} - Function getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials(users[0].user, Cryptr.encrypt(users[2].password), true);
  expect(Object.keys(response).length > 0).toEqual(false);
}, 10000);
test(`Testing ${getCounter()} - Function getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials('1-2', 'bb5ca2dbd534f6a94c7267579fd6259f6db0a0e2ab8dfef797ae', true);
  expect(Object.keys(response).length > 0).toEqual(false);
}, 10000);

/** Testing function mapperDocument
 */
test(`Testing ${getCounter()} - Function mapperDocument()`, async () => {
  counter += 1;
  const response = await mapperDocument(inputMapperDocument[0], 1, 'COMPRA', null, null);
  expect(response).toEqual(outputMapperDocument[0]);
}, 10000);
test(`Testing ${getCounter()} - Function mapperDocument()`, async () => {
  counter += 1;
  const response = await mapperDocument(inputMapperDocument[1], 2, 'VENTA', null, null);
  expect(response).toEqual(outputMapperDocument[1]);
}, 10000);
test(`Testing ${getCounter()} - Function mapperDocument()`, async () => {
  counter += 1;
  const response = await mapperDocument(inputMapperDocument[2], null);
  expect(response).toEqual(outputMapperDocument[2]);
}, 10000);
test(`Testing ${getCounter()} - Function mapperDocument()`, async () => {
  counter += 1;
  const response = await mapperDocument(inputMapperDocument[3]);
  expect(response).toEqual(outputMapperDocument[3]);
}, 10000);
test(`Testing ${getCounter()} - Function mapperDocument()`, async () => {
  counter += 1;
  const response = await mapperDocument();
  expect(response).toEqual({});
}, 10000);
