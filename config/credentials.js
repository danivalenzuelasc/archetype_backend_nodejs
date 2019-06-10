// Export global credentials
module.exports = {
  mongodb: process.env.MONGO_URI || 'mongodb://sc_root:1MYN0hhf1eg8BGAF@sectoreclesial-production-shard-00-00-wc4ow.mongodb.net:27017,sectoreclesial-production-shard-00-01-wc4ow.mongodb.net:27017,sectoreclesial-production-shard-00-02-wc4ow.mongodb.net:27017/test?ssl=true&replicaSet=sectoreclesial-production-shard-0&authSource=admin',
  sentry: process.env.SENRTY_API_KEY || 'https://148f89e9a9a94e41a3409f1a9976bb91@sentry.io/1198884',
};
