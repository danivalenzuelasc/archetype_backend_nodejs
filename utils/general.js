// Declare dependencies
const raven = require('raven');

// Function responseValueInternal()
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

// Export function errorTraceRaven()
exports.errorTraceRaven = (response = null, error = null, force = false) => {
  if (force) {
    raven.captureException(responseValueInternal({}, response, error));
  }
};

// Export function responseValue()
exports.responseValue = responseValueInternal;

// Export function shuffle
exports.shuffle = (a) => {
  const array = a;
  for (let i = array.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [array[i - 1], array[j]] = [array[j], array[i - 1]];
  }
  return array;
};
