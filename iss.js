const request = require('request');
const constants = require('./constants');

//Helper function to execute a request and deal with errors.
//Expects JSON APIs and will return JSON on success
//  - activityDescription (optional) is plain English (present progressive),
//    like "fetching coordinates", used for error message
//  - keyToTargetData (optional): if passed, only that key from the response
//    data will be returnd (doesn't support nested keys at this time)
const requestHelper = (requestUrl, callback, activityDescription, keyToTargetData) => {
  request(requestUrl, (err, res, body) => {
    let msg; //Will hold error message

    //The request itself returned an error
    if (err) {
      msg = `Request to ${constants.FREE_GEO_IP.API_ENDPOINT} failed`
          + `${activityDescription ? ` when ${activityDescription}` : ``}.\nError: ${err.message}`;
      return callback(new Error(msg), null);
    }

    //The request went through but we've got a non-200 response code
    if (res.statusCode !== 200) {
      msg = `Status Code ${res.statusCode}${activityDescription ? ` when ${activityDescription}` : ``}.`;
      return callback(new Error(msg), null);
    }

    //So far no errors, but don't know yet if response is valid JSON and can be parsed
    let data;
    try {
      data = JSON.parse(body);
    } catch (e) {
      //Returned data is not valid JSON
      msg = `JSON parser failed${activityDescription ? ` when ${activityDescription}.` : `.` } ${e.message}`;
      return callback(new Error(msg), null);
    }

    //Success - return JSON-parsed data from response body
    keyToTargetData ? callback(null, data[keyToTargetData]) : callback(null, data);
  });
};

const fetchMyIP = (callback) => {
  const requestUrl = constants.IPIFY.API_ENDPOINT;
  requestHelper(requestUrl, callback, "fetching IP address", "ip");
};

const fetchCoordsByIp = (ip, callback) => {
  const requestUrl = constants.FREE_GEO_IP.API_ENDPOINT + ip + '?' + constants.FREE_GEO_IP.API_KEY;
  requestHelper(requestUrl, callback, "fetching coordinates for IP");
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const requestUrl = constants.ISS_FLYOVER_APP.API_ENDPOINT + `?lat=${coords.latitude}&lon=${coords.longitude}`;
  requestHelper(requestUrl, callback, "fetching fly-over times", "response");
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
        callback(null, data);
      });
    });
  });
};

module.exports = { fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation };