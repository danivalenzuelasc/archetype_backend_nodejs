// Se exportan la configuracion de las colecciones
module.exports = () => {
  const api = {
    siiCredential: {
      import: false,
      router: {
        path: 'credential',
        root: 'sii',
      },
    },
    siiDocument: {
      import: false,
      router: {
        path: 'document',
        root: 'sii',
      },
    },
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
