// Setting Collections
module.exports = () => {
  const api = {
    address: {
      import: false,
    },
    city: {
      import: false,
    },
    contact: {
      import: false,
    },
    country: {
      import: false,
    },
    currency: {
      import: false,
    },
    email: {
      import: false,
    },
    language: {
      import: false,
    },
    mailing: {
      import: false,
    },
    minister: {
      import: false,
    },
    neighborhood: {
      import: false,
    },
    parish: {
      import: false,
    },
    permission: {
      import: false,
    },
    phone: {
      import: false,
    },
    social_network: {
      import: false,
    },
    state: {
      import: false,
    },
    timezone: {
      import: false,
    },
    user: {
      import: false,
    },
  };
  Object.keys(api).forEach((collection) => {
    api[collection].mocks = require(`./${collection}/${collection}.mocks`);
    api[collection].model = require(`./${collection}/${collection}.model`);
  });
  return api;
};
