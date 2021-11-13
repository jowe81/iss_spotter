const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./printPassTimes');

nextISSTimesForMyLocation()
  .then(printPassTimes) //Again, .then((passTimes) => {printPassTimes(passTimes);}) shortened to just the function name
  .catch(error => {
    console.log("It didn't work: ", error.message);
  });