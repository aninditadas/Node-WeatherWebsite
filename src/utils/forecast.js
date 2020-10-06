const request = require("request")

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=901237a08162c3d2fa2b5df3a161ee0d&query=" +
    latitude +
    "," +
    longitude +
    "&units=f"
  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback("unable to connect", undefined)
    } else if (body.error) {
      callback("unable to find location", undefined)
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is " +
          body.current.temperature +
          " outside but it feels like " +
          body.current.feelslike
      )
    }
  })
}
module.exports = forecast
