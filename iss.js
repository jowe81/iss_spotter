const request = require('request');
const constants = require('./constants');
const { fetchMyIP } = require('./fetchip');

const fetchCoordsByIp = (ip, callback) => {
  const requestUrl = constants.FREE_GEO_IP.API_ENDPOINT + ip + '?' + constants.FREE_GEO_IP.API_KEY;
  request(requestUrl, (err, res, body) => {
    if (!err) {
      if (res.statusCode === 200) {
        const { latitude, longitude } = JSON.parse(body);
        callback(null, { latitude, longitude });
      } else {
        callback(new Error(`Status Code ${res.statusCode} when fetching coordinates for IP. Response: ${body}`));
      }
    } else {
      callback(new Error(`Request to ${constants.FREE_GEO_IP.API_ENDPOINT} failed. Returned error: ${err}`));
    }
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const requestUrl = constants.ISS_FLYOVER_APP.API_ENDPOINT + `?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(requestUrl, (err, res, body) => {
    if (!err) {
      if (res.statusCode === 200) {
        const data = JSON.parse(body);
        callback(err, data.response);
      } else {
        callback(new Error(`Status Code ${res.statusCode} when fetching fly-over times. Response: ${body}`));
      }
    } else {
      callback(new Error(`Request to ${constants.ISS_FLYOVER_APP.API_ENDPOINT} failed. Returned error: ${err}`));
    }
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, ip) => {
    if (err) callback(err);
    fetchCoordsByIp(ip, (err, coords) => {
      if (err) callback(err);
      fetchISSFlyOverTimes(coords, (err, data) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      });
    });
  });
};

module.exports = { fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation };