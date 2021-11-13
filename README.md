# Get ISS Flyover times

## Features:
Will output a list of upcoming opportunities to spot the ISS. Uses the following APIs to do so:
* [IPIFY](https://api.ipify.org)
* [Free GEO IP](https://freegeoip.app/)
* [ISS Pass](https://iss-pass.herokuapp.com/json/) (sadly, this one is fake)

## Dependencies:
* [request](https://www.npmjs.com/package/request) ^2.88.2
* [request-promise-native](https://www.npmjs.com/package/request-promise-native) ^1.0.9

## Install it:
```bash
git clone https://github.com/jowe81/iss_spotter
cd iss_spotter
npm install
```

## Use it:
* callback style: ```npm run iss```
* with promises: ```npm run iss-promised```
## 

---
_This was a [Lighthouse Labs Flex](https://www.lighthouselabs.ca/en/web-development-flex-program) exercise._