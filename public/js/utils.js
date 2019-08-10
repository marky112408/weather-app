const request = require('request');

const geocode = (address, callback) => {
  request({
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFya3kxMTI0MDgiLCJhIjoiY2p2eDlpbngwMDJ0bzN5czI1MTBybzJjOCJ9.JQjt3aKWFUV_9oGd_PLS-Q`,
    json: true
  }, (error, response) => {
    if(error){
      callback("Unable to connect to web services", undefined);
      return ;
    }

    if(response.body.features.length === 0){
      callback("Location not found. Please try again", undefined);
      return ;
    }

    callback(undefined, {
      latitude: response.body.features[0].center[1],
      longitude: response.body.features[0].center[0],
      location: response.body.features[0].place_name
    });
  })
}

const weather = (coordinates, callback) => {
  request({
    url: `https://api.darksky.net/forecast/07d03f27d9ee6d09d5b41b7940181a81/${coordinates.latitude},${coordinates.longitude}?units=si`,
    json: true
  }, (error, response) => {
    if(error){
      callback('Unable to access web services', undefined);
      return;
    }

    if(response.body.error){
      callback('Unable to fetch weather data', undefined);
      return
    }

    const { temperature, precipProbability } = response.body.currently;
    callback(undefined, `${response.body.daily.data[0].summary} It is currently ${temperature} degrees Celsius outside. There is a ${precipProbability * 100}% chance of rain`);
    // callback(undefined,response.body);
  })
}

module.exports = {
  geocode,
  weather
}
