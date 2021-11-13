const constants = {

  //API to determine my IP address
  IPIFY: {
    API_ENDPOINT: "https://api.ipify.org?format=json",
  },

  //API to return GPS coordinates to a given IP address
  FREE_GEO_IP: {
    API_KEY: "apikey=d9906440-4422-11ec-b874-3700ba292615",
    API_ENDPOINT: "https://api.freegeoip.app/json/",
  },

  //API to return ISS flyover times for a given location. Fake :(
  ISS_FLYOVER_APP: {
    API_ENDPOINT: "https://iss-pass.herokuapp.com/json/",
  }

};

module.exports = constants;