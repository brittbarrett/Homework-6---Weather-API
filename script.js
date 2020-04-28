// This is my weather API key
var currWeatherKey = "79cade5321697ab8dfb6707a785178c59";

// Here we are building the URL we need to query the database (one call api)
var weatherQURL =
  "https://api.openweathermap.org/data/2.5/onecall?" +
  "lat={lat}&lon={lon}&appid=" +
  currWeatherKey;

// Here we run our AJAX call to the OpenWeatherMap One Call API
$.ajax({
  url: weatherQURL,
  method: "GET",
}).then(function (response) {
  // Log the queryURL
  console.log(weatherQURL);

  // Log the resulting object
  console.log(response);

  //   add city name content to html (would also like to display corresponding icon that i noticed in api response example)
  $(".city").html("<h1>" + response.name + " Weather Details</h1>");

  // add temp content to html
  $(".temp").text("Temperature (K) " + response.current.temp);
  $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

  //   Transfer  rest of content to HTML
  $(".humidity").text("Humidity: " + response.current.humidity);
  $(".wind").text("Wind Speed: " + response.current.wind_speed);
  $(".uvIndex").text("UV Index: " + response.current.uvi);

  // Convert the temp to fahrenheit
  var tempF = (response.current.temp - 273.15) * 1.8 + 32;

  // Log the data in the console as well
  console.log("Wind Speed: " + response.current.wind_speed);
  console.log("Humidity: " + response.current.humidity);
  console.log("Temperature (F): " + tempF);
});

// 5 day forecast api from OpenWeather
var forecastApiKey = "e0b9b9e2f453ce41eb68d5ed75d073ff";
var forecastQURL =
  "api.openweathermap.org/data/2.5/forecast?" +
  "q={city name},{state}&appid=" +
  forecastApiKey;

$.ajax({
  url: forecastQURL,
  method: "GET",
}).then(function (response) {
  console.log(forecastQURL);
  console.log(response);

  $(".forecast").html("<h2>" + "5-Day Forecast</h2>");
});
