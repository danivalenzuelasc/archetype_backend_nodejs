// Setting Collections
module.exports = () => {
  const api = {
    siiQueue: {
      import: false,
      router: {
        path: 'queue',
        root: 'sii',
      },
    },
  };
  Object.keys(api).forEach((collection) => {
    api[collection].mocks = require(`./${api[collection].router.root}/${api[collection].router.path}/${api[collection].router.root}_${api[collection].router.path}.mocks`);
    api[collection].model = require(`./${api[collection].router.root}/${api[collection].router.path}/${api[collection].router.root}_${api[collection].router.path}.model`);
  });
  return api;
};
