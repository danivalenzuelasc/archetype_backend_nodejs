// Declaracion de dependencias
const { errorTraceRaven, responseValue, shuffle } = require('./general');

// Configuracion del contador
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

/**
 * Prueba del metodo errorTraceRaven()
 */
test(`Prueba ${getCounter()} - Metodo errorTraceRaven()`, async () => {
  counter += 1;
  const response = await errorTraceRaven();
  expect(response).toBeUndefined();
}, 10000);
test(`Prueba ${getCounter()} - Metodo errorTraceRaven()`, async () => {
  counter += 1;
  const response = await errorTraceRaven(null, null);
  expect(response).toBeUndefined();
}, 10000);
test(`Prueba ${getCounter()} - Metodo errorTraceRaven()`, async () => {
  counter += 1;
  const response = await errorTraceRaven({}, null);
  expect(response).toBeUndefined();
}, 10000);
test(`Prueba ${getCounter()} - Metodo errorTraceRaven()`, async () => {
  counter += 1;
  const response = await errorTraceRaven(null, {});
  expect(response).toBeUndefined();
}, 10000);
test(`Prueba ${getCounter()} - Metodo errorTraceRaven()`, async () => {
  counter += 1;
  const response = await errorTraceRaven({}, {});
  expect(response).toBeUndefined();
}, 10000);

/**
 * Prueba del metodo responseValue()
 */
test(`Prueba ${getCounter()} - Metodo responseValue()`, () => {
  counter += 1;
  const response = responseValue(null, 1);
  expect(response).toBeDefined();
  expect(response).toEqual(1);
}, 10000);
test(`Prueba ${getCounter()} - Metodo responseValue()`, () => {
  counter += 1;
  const response = responseValue(null, 1);
  expect(response).toBeDefined();
  expect(response).toEqual(1);
}, 10000);
test(`Prueba ${getCounter()} - Metodo responseValue()`, () => {
  counter += 1;
  const response = responseValue(null, 2);
  expect(response).toBeDefined();
  expect(response).toEqual(2);
}, 10000);
test(`Prueba ${getCounter()} - Metodo responseValue()`, () => {
  counter += 1;
  const response = responseValue(null, null);
  expect(response).toBeDefined();
  expect(response).toEqual({});
}, 10000);
test(`Prueba ${getCounter()} - Metodo responseValue()`, () => {
  counter += 1;
  const response = responseValue(1, null);
  expect(response).toBeDefined();
  expect(response).toEqual(1);
}, 10000);
test(`Prueba ${getCounter()} - Metodo responseValue()`, () => {
  counter += 1;
  const response = responseValue(1, 2);
  expect(response).toBeDefined();
  expect(response).toEqual(1);
}, 10000);
test(`Prueba ${getCounter()} - Metodo responseValue()`, () => {
  counter += 1;
  const response = responseValue();
  expect(response).toBeDefined();
  expect(response).toEqual({});
}, 10000);

/**
 * Prueba del metodo shuffle()
 */
test(`Prueba ${getCounter()} - Metodo shuffle()`, () => {
  counter += 1;
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const response = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  expect(response).toBeDefined();
  expect(response).not.toEqual(array);
  expect(response.length).toEqual(array.length);
}, 10000);
test(`Prueba ${getCounter()} - Metodo shuffle()`, () => {
  counter += 1;
  const array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  const response = shuffle(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);
  expect(response).toBeDefined();
  expect(response).not.toEqual(array);
  expect(response.length).toEqual(array.length);
}, 10000);
test(`Prueba ${getCounter()} - Metodo shuffle()`, () => {
  counter += 1;
  const array = [1, 2, 3, 4, 5, 'a', 'b', 'c', 'd', 'e'];
  const response = shuffle([1, 2, 3, 4, 5, 'a', 'b', 'c', 'd', 'e']);
  expect(response).toBeDefined();
  expect(response).not.toEqual(array);
  expect(response.length).toEqual(array.length);
}, 10000);
