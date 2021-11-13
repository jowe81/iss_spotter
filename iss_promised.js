const request = require('request-promise-native');
const constants = require('./constants');

const fetchMyIP = () => {
  return request(constants.IPIFY.API_ENDPOINT);
};

/*
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = (ipInfo) => {
  const ip = JSON.parse(ipInfo).ip;
  return request(constants.FREE_GEO_IP.API_ENDPOINT + ip + '?' + constants.FREE_GEO_IP.API_KEY);
};

const fetchISSFlyOverTimes = (coordsInfo) => {
  const coords = JSON.parse(coordsInfo);
  return request(constants.ISS_FLYOVER_APP.API_ENDPOINT + `?lat=${coords.latitude}&lon=${coords.longitude}`);
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };