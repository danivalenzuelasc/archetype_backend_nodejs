// Declaracion de dependencias
const sentry = require('@sentry/node');

// Metodo responseValueInternal()
function responseValueInternal(response = null, error = null) {
  if (response) {
    return response;
  }
  if (error) {
    return error;
  }
  return {};
}

// Se exporta el metodo errorTraceRaven()
exports.errorTraceRaven = (response = null, error = null) => {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'testing') {
    sentry.captureException(responseValueInternal(response, error));
  }
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
