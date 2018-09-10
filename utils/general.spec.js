// Declare dependencies
const { errorTraceRaven, responseValue, shuffle } = require('./general');

// Setting counter
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

// Run testing
describe('Testing general', async () => {
  /*  Testing function ErrorTraceRaven
   */
  test(`Testing ${getCounter()} - Function errorTraceRaven()`, async () => {
    counter += 1;
    const response = await errorTraceRaven();
    expect(response).toBeUndefined();
  }, 10000);
  test(`Testing ${getCounter()} - Function errorTraceRaven()`, async () => {
    counter += 1;
    const response = await errorTraceRaven(null, null, true);
    expect(response).toBeUndefined();
  }, 10000);
  test(`Testing ${getCounter()} - Function errorTraceRaven()`, async () => {
    counter += 1;
    const response = await errorTraceRaven({}, null, true);
    expect(response).toBeUndefined();
  }, 10000);
  test(`Testing ${getCounter()} - Function errorTraceRaven()`, async () => {
    counter += 1;
    const response = await errorTraceRaven(null, {}, true);
    expect(response).toBeUndefined();
  }, 10000);
  test(`Testing ${getCounter()} - Function errorTraceRaven()`, async () => {
    counter += 1;
    const response = await errorTraceRaven({}, {}, true);
    expect(response).toBeUndefined();
  }, 10000);

  /*  Testing function ResponseValue
   */
  test(`Testing ${getCounter()} - Function responseValue()`, () => {
    counter += 1;
    const response = responseValue(null, 1);
    expect(response).toBeDefined();
    expect(response).toEqual(1);
  }, 10000);
  test(`Testing ${getCounter()} - Function responseValue()`, () => {
    counter += 1;
    const response = responseValue(null, 1, 2);
    expect(response).toBeDefined();
    expect(response).toEqual(1);
  }, 10000);
  test(`Testing ${getCounter()} - Function responseValue()`, () => {
    counter += 1;
    const response = responseValue(null, 1, 2, 3);
    expect(response).toBeDefined();
    expect(response).toEqual(1);
  }, 10000);
  test(`Testing ${getCounter()} - Function responseValue()`, () => {
    counter += 1;
    const response = responseValue(null, null, 2);
    expect(response).toBeDefined();
    expect(response).toEqual(2);
  }, 10000);
  test(`Testing ${getCounter()} - Function responseValue()`, () => {
    counter += 1;
    const response = responseValue(null, null, 2, 3);
    expect(response).toBeDefined();
    expect(response).toEqual(2);
  }, 10000);
  test(`Testing ${getCounter()} - Function responseValue()`, () => {
    counter += 1;
    const response = responseValue(null, null, null, 3);
    expect(response).toBeDefined();
    expect(response).toEqual(3);
  }, 10000);
  test(`Testing ${getCounter()} - Function responseValue()`, () => {
    counter += 1;
    const response = responseValue();
    expect(response).toBeDefined();
    expect(response).toBeNull();
  }, 10000);

  /*  Testing function Shuffle
   */
  test(`Testing ${getCounter()} - Function shuffle()`, () => {
    counter += 1;
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const response = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(response).toBeDefined();
    expect(response).not.toEqual(array);
    expect(response.length).toEqual(array.length);
  }, 10000);
  test(`Testing ${getCounter()} - Function shuffle()`, () => {
    counter += 1;
    const array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    const response = shuffle(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);
    expect(response).toBeDefined();
    expect(response).not.toEqual(array);
    expect(response.length).toEqual(array.length);
  }, 10000);
  test(`Testing ${getCounter()} - Function shuffle()`, () => {
    counter += 1;
    const array = [1, 2, 3, 4, 5, 'a', 'b', 'c', 'd', 'e'];
    const response = shuffle([1, 2, 3, 4, 5, 'a', 'b', 'c', 'd', 'e']);
    expect(response).toBeDefined();
    expect(response).not.toEqual(array);
    expect(response.length).toEqual(array.length);
  }, 10000);
});
