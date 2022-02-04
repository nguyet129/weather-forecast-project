//Feature 1: display the current date and time (eg. Tuesday 16:00)
function displayTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentDay = days[date.getDay()];
  let currentDate = ("0" + date.getDate()).slice(-2);
  let currentMonth = months[date.getMonth()];
  let currentHour = ("0" + date.getHours()).slice(-2);
  let currentMinute = ("0" + date.getMinutes()).slice(-2);
  return `${currentDay}, ${currentMonth} ${currentDate} <br> ${currentHour} : ${currentMinute}`;
}

let currentTime = document.querySelector("#current-time");
let now = new Date();
currentTime.innerHTML = displayTime(now);

//Feature 2: Display a fake temperature (i.e 25) in Celsius and add a link to convert it to Fahrenheit (ie. 77). When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
//from F to C//
function displayCTemp(event) {
  event.preventDefault();
  let cTemp = document.querySelector("#current-temp");
  cTemp.innerHTML = `25`;
  //let maxTemp = document.querySelector("#max-temp");
  //let maxUnit = document.querySelector("#max-unit");
  //let minTemp = document.querySelector("#min-temp");
  //let minUnit = document.querySelector("#minUnit");
  let minMax = document.querySelector(".temp-num");

  minMax.innerHTML = `Max 28°C<br />Min
                     21°C`;
}
let cUnit = document.querySelector(".cel-unit");
cUnit.addEventListener("click", displayCTemp);

//from C to F//
function displayFTemp(event) {
  event.preventDefault();
  let fTemp = document.querySelector("#current-temp");
  fTemp.innerHTML = `77`;
  let minMax = document.querySelector(".temp-num");
  minMax.innerHTML = `Max 82°F<br />Min
                     70°F`;
}
let fUnit = document.querySelector(".fah-unit");
fUnit.addEventListener("click", displayFTemp);

//Feature 3: When a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.//

//3.2. Retrieve and display city's name and current temperature from 3.1 API call and inject the result into HTML//
function displayCityWeather(response) {
  console.log(response);
  let retrievedWeatherDescription =
    response.data.current.weather[0].description;
  let WeatherDescription = document.querySelector("#description");
  WeatherDescription.innerHTML = retrievedWeatherDescription;

  let retrievedPrecipProb = `${response.data.hourly[0].pop * 100}%`;
  console.log(typeof retrievedPrecipProb);
  let PrecipProb = document.querySelector("#precip-prob");
  PrecipProb.innerHTML = retrievedPrecipProb;

  //To revisit - if retrieved prob = 0, precipamt = 0, else display retrieved precipamt//
  let PrecipAmt = document.querySelector("#precip-amt");
  if (retrievedPrecipProb === "0") {
    PrecipAmt.innerHTML = `0`;
  } else {
    PrecipAmt.innerHTML = response.data.hourly[0].clouds;
  }
}

function displayCityName(response) {
  console.log(response);
  let retrievedCity = response.data.name;
  let currentCity = document.querySelector("#current-place");
  currentCity.innerHTML = retrievedCity;

  let retrievedCurrentTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = retrievedCurrentTemp;

  let retrievedMaxTemp = Math.round(response.data.main.temp_max);
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = retrievedMaxTemp;

  let retrievedMinTemp = Math.round(response.data.main.temp_min);
  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = retrievedMinTemp;

  let cityLon = response.data.coord.lon;
  let cityLat = response.data.coord.lat;

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/onecall?";
  let apiKey = "0bc8b420ecade609fc97283e2769e598";
  let apiUrl = `${apiEndpoint}lon=${cityLon}&lat=${cityLat}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCityWeather);
}

//3.1. Call Weather API using input city name//
function retrieveCityInput(event) {
  event.preventDefault();
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let cityInput = document.querySelector("#city-input");
  let apiKey = "0bc8b420ecade609fc97283e2769e598";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}q=${cityInput.value}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCityName);
}
let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", retrieveCityInput);

//https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=0bc8b420ecade609fc97283e2769e598
//Feature 4: Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.//

//4.2. Use retrieved long lat from 4.1 to call Weather API //
function retrieveLongLat(position) {
  console.log(position);
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "0bc8b420ecade609fc97283e2769e598";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}lat=${lat}&lon=${long}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCityName);
}
//4.1. Set up Current button to trigger retrieving user's long lat on click//
function retrieveCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveLongLat);
}
let currentButton = document.querySelector("#current-search");
currentButton.addEventListener("click", retrieveCurrentPosition);
