// Setting Collections
module.exports = () => {
  const api = {
    address: {
      import: false,
    },
  };
  Object.keys(api).forEach((collection) => {
    api[collection].mocks = require(`./${collection}/${collection}.mocks`);
    api[collection].model = require(`./${collection}/${collection}.model`);
  });
  return api;
};
