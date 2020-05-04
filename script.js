// OBJECTIVES
// finish out oneday weather with data,
//grab lon and lat and get uv vis data(go through to get the value from the obj)
//dynamically append to html
//re-enable 5day fx
// HAVE IF STATMENET FOR NULL - if searchbox element == return
var currWeatherKey = "9cade5321697ab8dfb6707a785178c59";
var lon;
var lat;
var query = "";

var cityArray = JSON.parse(localStorage.getItem("cities"));
// If there's nothing in your cities array create an empty array
if (!Array.isArray(cityArray)) {
  //if we have no scores
  cityArray = [];
}
// DISPLAY THE CURRENT DATE
var displayDay = moment().format("MMM Do, YYYY");
// console.log(displayDay);
$("#current-day").append(" " + displayDay);

function submitCity(e) {
  event.preventDefault();
  //grab value
  var usercity = $(".userform").val().trim();
  console.log(usercity);
  if (usercity.length) {
    //push into array
    // $(".userform").val();
    cityArray.push(usercity);
    console.log(cityArray);
    //set the array to local storage
    localStorage.setItem("cities", JSON.stringify(cityArray));
    //call the 5day passing in the value
    fiveday(usercity);
    //call the 1day passing in the value
    getWeather(usercity);
    //call create cityButton
    cityButton();
    $(".userform").val("");
  }
}
function cityButton() {
  var localcityArray = JSON.parse(localStorage.getItem("cities"));
  // If there's nothing in your cities array create an empty array
  if (!Array.isArray(localcityArray)) {
    //if we have no scores
    localcityArray = [];
  }
  $(".buttonarea").empty();
  for (var i = 0; i < localcityArray.length; i++) {
    // <button id="cityBtn" value="Austin">Austin</button>
    var btn = $("<button>");
    //<button></button>
    btn.attr("id", "cityBtn");
    //<button id="cityBtn"></button>
    btn.attr("value", localcityArray[i]);
    //<button id="cityBtn" value="austin"></button>
    btn.text(localcityArray[i]);
    //<button id="cityBtn" value="austin">austin</button>
    $(".buttonarea").append(btn);
  }
  //find a button with the id of cityBtn
  $("button#cityBtn").on("click", function (event) {
    event.preventDefault();
    // onclick fx triggers when user clicks on citybtn
    //then get the value for that city = $(this).val()
    console.log($(this).val());

    //call 5day - WORKING BUT DATA STACKING INSTEAD OF REPLACING
    fiveday($(this).val());
    // console.log(fiveday($(this).val()));
    //call 1day
    getWeather($(this).val());
  });
}
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
function getWeather(query) {
  console.log("getweather query: " + query);
  var weatherQURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    currWeatherKey;
  console.log(weatherQURL);
  $.ajax({
    url: weatherQURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log("name:" + response.name);
    $("#current-city-weather").text(response.name);
    // convert temp to F
    var temp = response.main.temp;
    var tempF = (temp - 273) * 1.8 + 32;
    $("#Temp").text("Temperature: " + tempF.toFixed() + " F");
    $("#Humidity").text("Humidity: " + response.main.humidity + "%");
    // convert wind speed to MPH
    $("#WindSpeed").text("Wind Speed: " + response.wind.speed + "mph");

    lat = response.coord.lat;
    lon = response.coord.lon;
    //http://api.openweathermap.org/data/2.5/uvi/forecast?appid={appid}&lat={lat}&lon={lon}&cnt={cnt}
    var uvisURL =
      "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" +
      currWeatherKey +
      "&lat=" +
      lat +
      "&lon=" +
      lon;
    console.log(uvisURL);
    $.ajax({
      url: uvisURL,
      method: "GET",
    }).then(function (uvobj) {
      console.log(uvobj);
      $("#uvIndex").text("UV Index: " + uvobj[0].value);
    });
  });
}
// getWeather();
function fiveday(query) {
  // 5 day forecast api from OpenWeather
  var forecastApiKey = "87c1321c379a2aaa5caef175776e2f8b";
  var forecastQURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    query +
    "&appid=" +
    forecastApiKey;
  console.log(forecastQURL);
  $.ajax({
    url: forecastQURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $("#forecast-sec").empty();
    // <div class="card">
    //      <div class="card-header">Date</div>
    //      <div class="card-body">
    //ADD THIS INTO D3!!!! <p><img src="23.png"></p>
    //           <p class="card-text">temp</p>
    //           <p class="card-text"> humidity</p>
    //      </div>
    // </div>
    for (var i = 1; i < 6; i++) {
      var d1 = $("<div>");
      //<div></div>
      d1.attr("class", "card");
      //<div class="card"></div>
      var d2 = $("<div>");
      //<div></div>
      d2.attr("class", "card-header");
      var currentdate = response.list[i * 8].dt_txt.split(" ")[0];
      d2.text(moment(currentdate).format("MMMM Do, YYYY"));

      console.log(moment(currentdate).format("MMMM Do, YYYY"));
      var d3 = $("<div>");
      //<div></div>
      d3.attr("class", "card-body");
      var p1 = $("<p>");
      //<p></p>
      p1.attr("class", "card-text");
      var temp5Day = response.list[i * 8].main.temp;
      var temp5DayF = (temp5Day - 273) * 1.8 + 32;

      p1.text("Temp: " + temp5DayF.toFixed() + " F");
      var p2 = $("<p>");
      //<p></p>
      p2.attr("class", "card-text");
      p2.text("Humidity: " + response.list[i * 8].main.humidity + "%");
      d3.append(p1);
      //<div class="card-body">
      //<p class="card-text">temp</p>
      //</div>
      d3.append(p2);
      //<div class="card-body">
      //<p class="card-text">temp</p>
      //<p class="card-text"> humidity</p>
      //</div>
      d1.append(d2);
      d1.append(d3);
      $("#forecast-sec").append(d1);
      //date
      console.log(response.list[0].dt_txt);
      var date = response.list[0].main.temp;
      //date = date.split(" ")[0];
      //pic
      //temp

      console.log(date);
      //humidity
      console.log(response.list[0].main.humidity);
    }
    $(".forecast").html("<h2>" + "5-Day Forecast</h2>");
    //   how do i make sure this shows up in the correct spot on the html page?
  });
}
//fiveday("austin");
cityButton();
