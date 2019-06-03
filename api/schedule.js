// Declare dependencies
const nodeSchedule = require('node-schedule');
const request = require('request');
const settings = require('./../config/settings');
const { documents, typesOfDocuments } = require('./../config/sii');
const { errorTraceRaven } = require('./../utils/general');
const { getCredentials, getDocuments } = require('./../utils/sii');

// Setting API
const apiUrl = process.env.NODE_ENV === 'production' ? settings.url.api : `http://localhost:${settings.port}`;

// Export Schedules
exports.init = () => {
  // Run schedule [30 seconds]
  nodeSchedule.scheduleJob('*/30 * * * * *', () => {
    // Get listing queue
    const requestQueue = `${apiUrl}/sii/queue?limit=50&page=1&order=asc&type=Priority`;
    request(requestQueue, (errorQueue, responseQueue, dataQueue) => {
      if (errorQueue) {
        errorTraceRaven(errorQueue);
      } else {
        const queue = JSON.parse(dataQueue);
        queue.results.forEach((rowQueue) => {
          const requestCredential = `${apiUrl}/sii/credential?user=${rowQueue.user}`;
          request(requestCredential, (errorCredential, responseCredential, dataCredential) => {
            if (errorCredential) {
              errorTraceRaven(errorCredential);
            } else {
              const credential = JSON.parse(dataCredential);
              if (credential.results.length > 0) {
                getCredentials(credential.results[0].user, credential.results[0].password, true)
                  .then((session) => {
                    if (Object.keys(session).length > 0) {
                      typesOfDocuments.forEach((type) => {
                        documents.forEach((document) => {
                          document.list.forEach((row) => {
                            getDocuments(session, {
                              document: type.key,
                              operation: document.key,
                              state: row,
                              url: document.url,
                            }, '2019', '03')
                              .then((responseGetDocument) => {
                                console.info(responseGetDocument.length);
                              })
                              .catch((error) => {
                                console.info(error);
                              });
                          });
                        });
                      });
                    }
                  });
              }
            }
          });
        });
      }
    });
  });


  // Run schedule [30 seconds]
  nodeSchedule.scheduleJob('*30 * * * * *', () => {
    // Send mailing
    const listingMailing = `${settings.url.api}/sii/queue`;
    request(listingMailing, (errorListing, responseListing, dataListing) => {
      if (errorListing) {
        errorTraceRaven(errorListing);
      } else {
        const listing = JSON.parse(dataListing);
        listing.forEach((mail) => {
          const requestMailing = `${settings.url.api}/mailing/${mail._id}/send`;
          request(requestMailing);
        });
      }
    });
  });
  // Run schedule [1 minute]
  nodeSchedule.scheduleJob('0 * * * * *', () => {
    // Normalize Cities
    const listingCity = `${settings.url.api}/city/listing`;
    request(listingCity, (errorListing, responseListing, dataListing) => {
      if (errorListing) {
        errorTraceRaven(errorListing);
      } else {
        const listing = JSON.parse(dataListing);
        listing.forEach((city) => {
          const requestCity = `${settings.url.api}/city/${city._id}/normalize`;
          request(requestCity);
        });
      }
    });
    // Normalize Countries
    const listingCountry = `${settings.url.api}/country/listing`;
    request(listingCountry, (errorListing, responseListing, dataListing) => {
      if (errorListing) {
        errorTraceRaven(errorListing);
      } else {
        const listing = JSON.parse(dataListing);
        listing.forEach((country) => {
          const requestState = `${settings.url.api}/country/${country._id}/normalize`;
          request(requestState);
        });
      }
    });
    // Normalize Neighborhoods
    const listingNeighborhood = `${settings.url.api}/neighborhood/listing`;
    request(listingNeighborhood, (errorListing, responseListing, dataListing) => {
      if (errorListing) {
        errorTraceRaven(errorListing);
      } else {
        const listing = JSON.parse(dataListing);
        listing.forEach((neighborhood) => {
          const requestNeighborhood = `${settings.url.api}/neighborhood/${neighborhood._id}/normalize`;
          request(requestNeighborhood);
        });
      }
    });
    // Normalize States
    const listingState = `${settings.url.api}/state/listing`;
    request(listingState, (errorListing, responseListing, dataListing) => {
      if (errorListing) {
        errorTraceRaven(errorListing);
      } else {
        const listing = JSON.parse(dataListing);
        listing.forEach((state) => {
          const requestState = `${settings.url.api}/state/${state._id}/normalize`;
          request(requestState);
        });
      }
    });
  });
};
