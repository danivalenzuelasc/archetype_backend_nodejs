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
    const { router } = api[collection];
    api[collection].mocks = require(`./${router.root}/${router.path}/${router.root}_${router.path}.mocks`);
    api[collection].model = require(`./${router.root}/${router.path}/${router.root}_${router.path}.model`);
  });
  return api;
};
