// Export global configs
module.exports = {
  endpoint: {
    crypt: 'secret',
    hashing: 43200000,
    limit: 500,
  },
  jwt: process.env.JWT || '811A4ED44E3B1C4C78576D4EA5C680A62B266BE78CA1E24FAA3F772D20306D74A4AA12E3AC36677FFC048C98CE98F4F6B516869645E3884EC75E09B7C04FE75A',
  port: process.env.PORT || 4000,
  url: {
    api: 'https://api.sectoreclesial.com',
  },
};
