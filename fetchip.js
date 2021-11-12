const request = require("request");

const IPIFY_API_URL = 'https://api.ipify.org?format=json';

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request(IPIFY_API_URL, (err, res, body) => {
    if (!err) {
      const data = JSON.parse(body); //Object expected
      if (data.ip) {
        callback(err, data.ip);
      } else {
        //No error but no data either
        callback();
      }
    } else {
      //Error - request failed
      callback(err, null);
    }
  });
};

module.exports = { fetchMyIP };