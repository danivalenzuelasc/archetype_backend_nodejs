// Declaracion de dependencias
const sentry = require('@sentry/node');

// Metodo responseValueInternal()
function responseValueInternal(response = null, a = null, b = null, c = null) {
  if (a) {
    return a;
  }
  if (b) {
    return b;
  }
  if (c) {
    return c;
  }
  return response;
}

// Se exporta el metodo errorTraceRaven()
exports.errorTraceRaven = (response = null, error = null) => {
  sentry.captureException(responseValueInternal({}, response, error));
};

// Se exporta el metodo responseValue()
exports.responseValue = responseValueInternal;

// Se exporta el metodo shuffle()
exports.shuffle = (a) => {
  const array = a;
  for (let i = array.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [array[i - 1], array[j]] = [array[j], array[i - 1]];
  }
  return array;
};
