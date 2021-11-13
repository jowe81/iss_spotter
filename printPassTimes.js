//Takes an array of objects with flyover data and logs it to the console
const printPassTimes = (passTimes) => {
  for (let passTime of passTimes) {
    console.log(`Next pass at ${new Date(passTime.risetime * 1000).toString()} for ${passTime.duration} seconds!`);
  }
};

module.exports = { printPassTimes };