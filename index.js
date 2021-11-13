const { fetchMyIP } = require('./fetchip');
const { fetchCoordsByIp } = require('./iss');

fetchMyIP((err, ip) => {
  fetchCoordsByIp(ip, (err, data) => {
    console.log("Error: ", err, "Data: ", data);
  });
});

