const { nextISSTimesForMyLocation } = require('./iss_promised');

//Copied from index.js
const printPassTimes = (passTimes) => {
  for (let passTime of passTimes) {
    console.log(`Next pass at ${new Date(passTime.risetime * 1000).toString()} for ${passTime.duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then(printPassTimes);