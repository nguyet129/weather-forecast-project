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

//Feature 2: Display a fake temperature (i.e 25) in Celsius and add a link to convert it to Fahrenheit (ie. 77). When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
//from F to C//
function displayCTemp(event) {
  event.preventDefault();
  let currentCTemp = document.querySelector("#current-temp");
  currentCTemp.innerHTML = Math.round(retrievedCTemp);

  cUnit.classList.add("active");
  fUnit.classList.remove("active");
  let maxCTemp = document.querySelector("#max-temp");
  let minCTemp = document.querySelector("#min-temp");
  let maxUnit = document.querySelector("#max-unit");
  let minUnit = document.querySelector("#min-unit");
  maxCTemp.innerHTML = Math.round(retrievedMaxCTemp);
  minCTemp.innerHTML = Math.round(retrievedMinCTemp);
  maxUnit.innerHTML = `°C`;
  minUnit.innerHTML = `°C`;
}

//from C to F//
function displayFTemp(event) {
  event.preventDefault();
  let currentFTemp = Math.round(retrievedCTemp * 1.8 + 32);
  let retrievedMaxFTemp = Math.round(retrievedMaxCTemp * 1.8 + 32);
  let retrievedMinFTemp = Math.round(retrievedMinCTemp * 1.8 + 32);
  let fTemp = document.querySelector("#current-temp");

  fTemp.innerHTML = currentFTemp;

  cUnit.classList.remove("active");
  fUnit.classList.add("active");
  let maxFTemp = document.querySelector("#max-temp");
  let minFTemp = document.querySelector("#min-temp");
  let maxUnit = document.querySelector("#max-unit");
  let minUnit = document.querySelector("#min-unit");
  maxFTemp.innerHTML = retrievedMaxFTemp;
  minFTemp.innerHTML = retrievedMinFTemp;
  maxUnit.innerHTML = `°F`;
  minUnit.innerHTML = `°F`;
}

//Feature 3: When a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.//

//3.3. Retrieve and display relevant weather info from 3.2 API calls and inject the result into HTML//
function displayCityAqi(response) {
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
  let retrievedWeatherDescription =
    response.data.current.weather[0].description;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = retrievedWeatherDescription;

  let retrievedWeatherIcon = response.data.current.weather[0].icon;
  let weatherIcon = document.querySelector("#current-icon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${retrievedWeatherIcon}@2x.png`
  );

  let retrievedPrecipProb = `${Math.round(response.data.hourly[0].pop * 100)}%`;
  let precipProb = document.querySelector("#precip-prob");
  precipProb.innerHTML = retrievedPrecipProb;

  /*To revisit - if retrieved prob = 0, precipamt = 0, else display retrieved precipamt//
  let precipAmt = document.querySelector("#precip-amt");
  if (Number(retrievedPrecipProb) == 0) {
    precipAmt.innerHTML = `0`;
  } else {
    precipAmt.innerHTML = response.data.hourly[0].rain["1h"];
  }*/

  let retrievedUvi = Math.round(response.data.current.uvi);
  let uvi = document.querySelector("#uvi");
  uvi.innerHTML = retrievedUvi;

  let uviLookup = [
    "Low",
    "Low",
    "Low",
    "Moderate",
    "Moderate",
    "Moderate",
    "High",
    "High",
    "Very High",
    "Very High",
    "Very High",
    "Extreme",
    "Extreme",
    "Extreme",
    "Extreme",
  ];
  let retrievedUviDesc = uviLookup[retrievedUvi];
  let uviDesc = document.querySelector("#uvi-des");
  uviDesc.innerHTML = retrievedUviDesc;

  let retrievedUviDetailDesc = "";
  if (retrievedUviDesc == "Low") {
    retrievedUviDetailDesc =
      "Wear sunglasses on bright days. If you burn easily, cover up and use broad spectrum SPF 15+ sunscreen. Bright surfaces, sand, water, and snow will increase UV exposure.";
  } else {
    if (retrievedUviDesc == "Moderate") {
      retrievedUviDetailDesc =
        "Stay in shade near midday when the Sun is strongest. If outdoors, wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.";
    } else {
      if (retrievedUviDesc == "High") {
        retrievedUviDetailDesc =
          "Reduce time in the sun between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.";
      } else {
        if (retrievedUviDesc == "Very High") {
          retrievedUviDetailDesc =
            "Minimize sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.";
        } else {
          retrievedUviDetailDesc =
            "Try to avoid sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.";
        }
      }
    }
  }

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
  let currentCityFuture = document.querySelector("#current-city-future");
  currentCityFuture.innerHTML = retrievedCity;
  let currentCityMusic = document.querySelector("#current-city-music");
  currentCityMusic.innerHTML = retrievedCity;

  let cityLon = response.data.coord.lon;
  let cityLat = response.data.coord.lat;

  let onecallApiEndpoint = "https://api.openweathermap.org/data/2.5/onecall?";
  let onecallApiKey = "0bc8b420ecade609fc97283e2769e598";
  let onecallApiUrl = `${onecallApiEndpoint}lon=${cityLon}&lat=${cityLat}&appid=${onecallApiKey}`;
  axios.get(onecallApiUrl).then(displayCityWeather);

  let aqiApiEndpoint = "https://api.openweathermap.org/data/2.5/air_pollution?";
  let aqiApiKey = "0bc8b420ecade609fc97283e2769e598";
  let aqiApiUrl = `${aqiApiEndpoint}lon=${cityLon}&lat=${cityLat}&appid=${aqiApiKey}`;
  axios.get(aqiApiUrl).then(displayCityAqi);

  cUnit.classList.add("active");
  fUnit.classList.remove("active");

  retrievedCTemp = response.data.main.temp;
  let retrievedCurrentTemp = Number(Math.round(retrievedCTemp));
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = retrievedCurrentTemp;

  retrievedMaxCTemp = Number(Math.round(response.data.main.temp_max));
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = retrievedMaxCTemp;

  retrievedMinCTemp = Number(Math.round(response.data.main.temp_min));
  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = retrievedMinCTemp;

  let maxUnit = document.querySelector("#max-unit");
  let minUnit = document.querySelector("#min-unit");
  maxUnit.innerHTML = `°C`;
  minUnit.innerHTML = `°C`;

  //Feature 6: Music recommendation based on weather search result
  let retrievedWeatherCode = Number(response.data.weather[0].id);
  let musicLink = document.querySelector("#music-link");
  if (retrievedWeatherCode < 500) {
    musicLink.setAttribute(
      "href",
      "https://open.spotify.com/playlist/7cLOoKbAe6iYGo7L4XzrW3?si=9cb08d2e23234f91"
    );
  } else {
    if (500 <= retrievedWeatherCode && retrievedWeatherCode < 600) {
      musicLink.setAttribute(
        "href",
        "https://open.spotify.com/playlist/37i9dQZF1DWYxwmBaMqxsl?si=17c697c270714c02"
      );
    } else {
      if (600 <= retrievedWeatherCode && retrievedWeatherCode < 700) {
        musicLink.setAttribute(
          "href",
          "https://open.spotify.com/playlist/6vDncMJTjHNAsUDRLgKu4c?si=bdd4c1cb0aac4418"
        );
      } else {
        if (retrievedWeatherCode >= 800 && retrievedCurrentTemp < 15) {
          musicLink.setAttribute(
            "href",
            "https://open.spotify.com/playlist/45khNqBoRenk2U4hb66baR?si=02ee8238c6ac4cf2"
          );
        } else {
          if (retrievedWeatherCode >= 800 && retrievedCurrentTemp > 15) {
            musicLink.setAttribute(
              "href",
              "https://open.spotify.com/playlist/1e82JSBwrnZF8TODtUcHeR?si=a2f71b04a8d5410b"
            );
          } else {
            if (700 < retrievedWeatherCode && retrievedWeatherCode < 800) {
              musicLink.setAttribute(
                "href",
                "https://open.spotify.com/playlist/14ulZFfmhA9r5McS8RZDYG?si=7284cfca9e744aa6"
              );
            }
          }
        }
      }
    }
  }
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

//Feature 5: Display Weather Report of Tokyo by default
window.onload = function displayDefaultWeather(event) {
  event.preventDefault();
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let cityInput = "melbourne";
  let apiKey = "0bc8b420ecade609fc97283e2769e598";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}q=${cityInput}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCityNameTemp);
};

//Feature 6: Display Weather forecast of the input city

function displayForecast() {
  let forecast = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["TUE", "WED", "THU", "FRI", "SAT"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-md future-each">
                    <div class="future-date">${day}</div>
                    <div class="future-icon">🌧</div>
                    <div class="future-temp">28°C</div>
                  </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

let currentTime = document.querySelector("#current-time");
let now = new Date();
currentTime.innerHTML = displayTime(now);

let retrievedCTemp = null;
let retrievedMaxCTemp = null;
let retrievedMinCTemp = null;
let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", retrieveCityInput);

let cUnit = document.querySelector("#cel-unit");
cUnit.addEventListener("click", displayCTemp);
let fUnit = document.querySelector("#fah-unit");
fUnit.addEventListener("click", displayFTemp);

let currentButton = document.querySelector("#current-search");
currentButton.addEventListener("click", retrieveCurrentPosition);

displayForecast();
//Feature 7: Display Current weather in other cities by default

/*function displayWeatherOtherCities(response) {
  let retrievedTempOtherCities = Math.round(response.data.main.temp);
  let tempOtherCities = document.querySelector(".other-temp");
  tempOtherCities.innerHTML = retrievedTempOtherCities;
}
window.onload = function retrieveWeatherOtherCities(event) {
  event.preventDefault();
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let cityInput = document.querySelectorAll(".city");
  let apiKey = "0bc8b420ecade609fc97283e2769e598";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}q=${cityInput.value}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherOtherCities);
};*/
