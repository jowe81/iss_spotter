const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised');

fetchMyIP()
  .then(fetchCoordsByIP) //.then(ipInfo => fetchCoordsByIP(ipInfo)) can be shortened to just the function name!
  .then(coordsInfo => fetchISSFlyOverTimes(coordsInfo)) //same for .then(coordsInfo => fetchISSFlyOverTimes(coordsInfo))
  .then(flyoverData => console.log(flyoverData));