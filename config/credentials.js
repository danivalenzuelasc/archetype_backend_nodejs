// Export global credentials
module.exports = {
  google: {
    analytics: process.env.GOOGLE_ANALYTICS_API_KEY || '',
    maps: process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyCPtgwKI2FV_mfYtKXjA6h7EeyE9liyRwk',
  },
  mongodb: process.env.MONGO_URI || 'mongodb://sc_root:1MYN0hhf1eg8BGAF@sectoreclesial-production-shard-00-00-wc4ow.mongodb.net:27017,sectoreclesial-production-shard-00-01-wc4ow.mongodb.net:27017,sectoreclesial-production-shard-00-02-wc4ow.mongodb.net:27017/test?ssl=true&replicaSet=sectoreclesial-production-shard-0&authSource=admin',
  sendgrid: process.env.SENDGRID_API_KEY || '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',
  sentry: process.env.SENRTY_API_KEY || 'https://148f89e9a9a94e41a3409f1a9976bb91@sentry.io/1198884',
};
