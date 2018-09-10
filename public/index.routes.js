// Declare dependencies
const path = require('path');

// Export default
exports.default = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/index.html`));
  });
  app.get('/*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/page_not_found.html`));
  });
};
