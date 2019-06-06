// Export global configs
module.exports = {
  endpoint: {
    crypt: process.env.CRYPT || '$&mHn5qbc75J}c>',
    hashing: 43200000,
    limit: 500,
  },
  port: process.env.PORT || 4000,
};
