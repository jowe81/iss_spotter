const { fetchMyIP } = require('./fetchip');
const { fetchCoordsByIp, fetchFlyouversForLocation, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((err, ip) => {
  fetchCoordsByIp(ip, (err, coords) => {
    fetchISSFlyOverTimes(coords, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  });
});

