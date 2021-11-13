const request = require('request');
const constants = require('./constants');

//Helper function to execute a request and deal with errors.
//activityDescription (optional) is plain English (present progressive), like "fetching coordinates", used for error message
//Expects JSON APIs and will return JSON on success
const requestHelper = (requestUrl, callback, activityDescription) => {
  request(requestUrl, (err, res, body) => {
    let msg;

    //The request itself returned an error
    if (err) {
      msg = `Request to ${constants.FREE_GEO_IP.API_ENDPOINT} failed. Returned error: ${err}`;
      return callback(new Error(msg), null);
    }

    //The request went through but we've got a non-200 response code
    if (res.statusCode !== 200) {
      msg = `Status Code ${res.statusCode}`;
      //Add activityDescription to the error message if present
      if (activityDescription) {
        msg += `when ${activityDescription}.`;
      }
      return callback(new Error(msg), null);
    }

    //Success - return JSON-parsed data from response body
    callback(null, JSON.parse(body));
  });
};

const fetchMyIP = (callback) => {
  request(constants.IPIFY.API_ENDPOINT, (err, res, body) => {
    if (!err) {
      if (res.statusCode === 200) {
        const data = JSON.parse(body); //Object expected
        if (data.ip) {
          //All good
          callback(null, data.ip);
        } else {
          //No error but no data either
          callback(Error("IP field returned empty."));
        }
      } else {
        //Non-200 status code
        const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
      }
    } else {
      //Error - request failed
      callback(err, null);
    }
  });
};

const fetchCoordsByIp = (ip, callback) => {
  const requestUrl = constants.FREE_GEO_IP.API_ENDPOINT + ip + '?' + constants.FREE_GEO_IP.API_KEY;
  requestHelper(requestUrl, callback, "fetching coordinates for IP");
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const requestUrl = constants.ISS_FLYOVER_APP.API_ENDPOINT + `?lat=${coords.latitude}&lon=${coords.longitude}`;
  requestHelper(requestUrl, callback, "fetching fly-over times");
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
    if (err) return callback(err, null);
    fetchCoordsByIp(ip, (err, coords) => {
      if (err) return callback(err, null);
      fetchISSFlyOverTimes(coords, (err, data) => {
        if (err) return callback(err, null);
        //All API calls succeeded!
        callback(null, data.response);
      });
    });
  });
};

module.exports = { fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation };