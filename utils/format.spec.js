// Declare dependencies
const { cleanCharacters } = require('./format');

// Setting counter
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

/*  Testing function ErrorTraceRaven
  */
test(`Testing ${getCounter()} - Function cleanCharacters()`, async () => {
  counter += 1;
  const response = await cleanCharacters('ÀÁÂÃÄÅÆàáâãäåæ');
  expect(response).toEqual('AAAAAAAEaaaaaaae');
}, 10000);
test(`Testing ${getCounter()} - Function cleanCharacters()`, async () => {
  counter += 1;
  const response = await cleanCharacters('ÈÉÊËèéêëÌÍÎÏìíîï');
  expect(response).toEqual('EEEEeeeeIIIIiiii');
}, 10000);
test(`Testing ${getCounter()} - Function cleanCharacters()`, async () => {
  counter += 1;
  const response = await cleanCharacters('ÒÓÔÕÖØŒòóôõöøœ');
  expect(response).toEqual('OOOOOOOEoooooooe');
}, 10000);
test(`Testing ${getCounter()} - Function cleanCharacters()`, async () => {
  counter += 1;
  const response = await cleanCharacters('ÙÚÛÜùúûü');
  expect(response).toEqual('UUUUuuuu');
}, 10000);
test(`Testing ${getCounter()} - Function cleanCharacters()`, async () => {
  counter += 1;
  const response = await cleanCharacters('ÇÐÑŠÝŸçðñšýÿ');
  expect(response).toEqual('CENSYYcensyy');
}, 10000);
