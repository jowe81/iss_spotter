const request = require('request');
const constants = require('./constants');
const { fetchMyIP } = require('./fetchip');

const fetchCoordsByIp = (ip, callback) => {
  const requestUrl = constants.FREE_GEO_IP.API_ENDPOINT + ip + '?' + constants.FREE_GEO_IP.API_KEY;
  request(requestUrl, (err, res, body) => {
    const { latitude, longitude } = JSON.parse(body);
    callback(err, { latitude, longitude });
  });
};

module.exports = { fetchCoordsByIp };