// Declare dependencies
const { getCredentials } = require('./sii');

// Setting counter

let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

/** Testing function ErrorTraceRaven
 */
test(`Testing ${getCounter()} - Function getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials('17.052.424-1', '57418e336eef064ec5467e7ba48434eabad63b2f04e8', true);
  expect(Object.keys(response).length > 0).toEqual(true);
}, 10000);
test(`Testing ${getCounter()} - Function getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials('76.973.499-6', 'dde7ead33703160cee04cc88f8d69248440f3c94eaf7db', true);
  expect(Object.keys(response).length > 0).toEqual(true);
}, 10000);
test(`Testing ${getCounter()} - Function getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials('76.103.915-6', 'bb5ca2dbd534f6a94c7267579fd6259f6db0a0e2ab8dfef797ae', true);
  expect(Object.keys(response).length > 0).toEqual(true);
}, 10000);
test(`Testing ${getCounter()} - Function getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials('17.052.424-1', 'bb5ca2dbd534f6a94c7267579fd6259f6db0a0e2ab8dfef797ae', true);
  expect(Object.keys(response).length > 0).toEqual(false);
}, 10000);
test(`Testing ${getCounter()} - Function getCredentials()`, async () => {
  counter += 1;
  const response = await getCredentials('1-2', 'bb5ca2dbd534f6a94c7267579fd6259f6db0a0e2ab8dfef797ae');
  expect(Object.keys(response).length > 0).toEqual(false);
}, 10000);
