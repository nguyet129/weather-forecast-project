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

//3.3. Retrieve and display relevant weather info from 3.2 API calls and inject the result into HTML//
function displayCityAqi(response) {
  console.log(response);
  let retrievedAqi = response.data.list[0].main.aqi;
  //let aqiIndexLookup = ["0", "0-25", "25-50", "50-75", "75-100", "100+"];
  let aqi = document.querySelector("#aqi");
  //aqi.innerHTML = aqiIndexLookup[retrievedAqi];
  aqi.innerHTML = retrievedAqi;

  let aqiLookup = ["None", "Good", "Fair", "Moderate", "Poor", "Very Poor"];
  let retrievedAqiDesc = aqiLookup[retrievedAqi];
  let aqiDesc = document.querySelector("#aqi-des");
  aqiDesc.innerHTML = retrievedAqiDesc;

  let aqiDetailLookup = [
    "Ideal air quality for outdoor activities.",
    "Ideal air quality for outdoor activities.",
    "Only very few hypersensitive people should reduce outdoor activities.",
    "No need to modify your usual outdoor activities unless you experience symptoms such as coughing and throat irritation.",
    "Consider reducing or rescheduling strenuous activities outdoors if you experience symptoms such as coughing and throat irritation.",
    "Reduce or reschedule strenuous activities outdoors, especially if you experience symptoms such as coughing and throat irritation.",
  ];
  let retrievedAqiDetailDesc = aqiDetailLookup[retrievedAqi];
  let aqiDetailDesc = document.querySelector("#aqi-detailed-des");
  aqiDetailDesc.innerHTML = retrievedAqiDetailDesc;
}

function displayCityWeather(response) {
  console.log(response);
  let retrievedWeatherDescription =
    response.data.current.weather[0].description;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = retrievedWeatherDescription;

  let retrievedPrecipProb = `${response.data.hourly[0].pop * 100}%`;
  console.log(typeof retrievedPrecipProb);
  let precipProb = document.querySelector("#precip-prob");
  precipProb.innerHTML = retrievedPrecipProb;

  //To revisit - if retrieved prob = 0, precipamt = 0, else display retrieved precipamt//
  let precipAmt = document.querySelector("#precip-amt");
  if (retrievedPrecipProb === "0") {
    precipAmt.innerHTML = `0`;
  } else {
    precipAmt.innerHTML = response.data.hourly[0].clouds;
  }

  let retrievedUvi = Math.round(response.data.current.uvi);
  let uvIndexLookup = ["0", "0-2", "3-5", "6-7", "8-10", "11+"];
  let uvi = document.querySelector("#uvi");
  uvi.innerHTML = uvIndexLookup[retrievedUvi];

  let uviLookup = ["None", "Low", "Moderate", "High", "Very High", "Extreme"];
  let retrievedUviDesc = uviLookup[retrievedUvi];
  let uviDesc = document.querySelector("#uvi-des");
  uviDesc.innerHTML = retrievedUviDesc;

  let uviDetailLookup = [
    "Wear sunglasses on bright days. If you burn easily, cover up and use broad spectrum SPF 15+ sunscreen. Bright surfaces, sand, water, and snow will increase UV exposure.",
    "Wear sunglasses on bright days. If you burn easily, cover up and use broad spectrum SPF 15+ sunscreen. Bright surfaces, sand, water, and snow will increase UV exposure.",
    "Stay in shade near midday when the Sun is strongest. If outdoors, wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.",
    "Reduce time in the sun between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.",
    "Minimize sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.",
    "Try to avoid sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.",
  ];
  let retrievedUviDetailDesc = uviDetailLookup[retrievedUvi];
  let uviDetailDesc = document.querySelector("#uvi-detailed-des");
  uviDetailDesc.innerHTML = retrievedUviDetailDesc;
}

//3.2. Retrieve and display city's name and current temperature from 3.1 Weather API call. Inject the result into HTML.
//Call Onecall and Air API using retrieved long lat from 3.1 Current Weather API call.

function displayCityNameTemp(response) {
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

  let onecallApiEndpoint = "https://api.openweathermap.org/data/2.5/onecall?";
  let onecallApiKey = "0bc8b420ecade609fc97283e2769e598";
  let onecallApiUrl = `${onecallApiEndpoint}lon=${cityLon}&lat=${cityLat}&appid=${onecallApiKey}`;
  axios.get(onecallApiUrl).then(displayCityWeather);

  let aqiApiEndpoint = "http://api.openweathermap.org/data/2.5/air_pollution?";
  let aqiApiKey = "0bc8b420ecade609fc97283e2769e598";
  let aqiApiUrl = `${aqiApiEndpoint}lon=${cityLon}&lat=${cityLat}&appid=${aqiApiKey}`;
  axios.get(aqiApiUrl).then(displayCityAqi);
}

//3.1. Call Weather API using input city name//
function retrieveCityInput(event) {
  event.preventDefault();
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let cityInput = document.querySelector("#city-input");
  let apiKey = "0bc8b420ecade609fc97283e2769e598";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}q=${cityInput.value}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCityNameTemp);
}
let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", retrieveCityInput);

//https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=0bc8b420ecade609fc97283e2769e598
//Feature 4: Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.//

//4.2. Call Weather API using retrieved long lat from 4.1//
function retrieveLongLat(position) {
  console.log(position);
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "0bc8b420ecade609fc97283e2769e598";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}lat=${lat}&lon=${long}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCityNameTemp);
}
//4.1. Set up Current button to trigger retrieving user's long lat on click//
function retrieveCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveLongLat);
}
let currentButton = document.querySelector("#current-search");
currentButton.addEventListener("click", retrieveCurrentPosition);
