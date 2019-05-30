// Declare dependencies
const nodeSchedule = require('node-schedule');
const request = require('request');
const settings = require('./../config/settings');
const { errorTraceRaven } = require('./../utils/general');

// Export Schedules
exports.init = () => {
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
