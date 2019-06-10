// Declare dependencies
const { getCredentials, mapperDocument } = require('./sii');

// Declare mocks spec
const { inputMapperDocument, outputMapperDocument } = require('./sii.mocks');

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
  const response = await getCredentials('17.052.424-1', '99a533c1ab7b06a99170718bd4876516540af7918762', true);
  expect(Object.keys(response).length).toBeGreaterThan(0);
}, 10000);
test(`Testing ${getCounter()} - Function getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials('76.973.499-6', 'ba9c3c74e04c20363b17013e80339d53fcb47f5cd9c29d', true);
  expect(Object.keys(response).length).toBeGreaterThan(0);
}, 10000);
test(`Testing ${getCounter()} - Function getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials('76.103.915-6', '2fcf93ad857d9b83b8a3022b8ab0f9a4642d39f667d31dda7483', true);
  expect(Object.keys(response).length).toBeGreaterThan(0);
}, 10000);
test(`Testing ${getCounter()} - Function getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials('17.052.424-1', 'bb5ca2dbd534f6a94c7267579fd6259f6db0a0e2ab8dfef797ae', true);
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
