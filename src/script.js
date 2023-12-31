function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temperature.minimum
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let sheCodesApiKey = "a6cffa5b8e9ecaco3744cb54dd3t4b40";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${sheCodesApiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  if (response.data.weather[0].main == "Clouds") {
    document.getElementById("weatherAppContatiner").style.backgroundImage =
      "url('./images/Clouds.gif')";
  } else if (
    response.data.weather[0].main == "Drizzle" ||
    response.data.weather[0].main == "Rain"
  ) {
    document.getElementById("weatherAppContatiner").style.backgroundImage =
      "url('./images/Rain.gif')";
  } else if (response.data.weather[0].main == "Clear") {
    document.getElementById("weatherAppContatiner").style.backgroundImage =
      "url('./images/Clear.gif')";
  } else if (
    response.data.weather[0].main == "Thunderstorm" ||
    response.data.weather[0].main == "Squall"
  ) {
    document.getElementById("weatherAppContatiner").style.backgroundImage =
      "url('./images/Thunderstorm.gif')";
  } else if (response.data.weather[0].main == "Snow") {
    document.getElementById("weatherAppContatiner").style.backgroundImage =
      "url('./images/Snow.gif')";
  } else if (
    response.data.weather[0].main == "Mist" ||
    response.data.weather[0].main == "Smoke" ||
    response.data.weather[0].main == "Haze" ||
    response.data.weather[0].main == "Fog"
  ) {
    document.getElementById("weatherAppContatiner").style.backgroundImage =
      "url('./images/Mist.gif')";
  } else if (response.data.weather[0].main == "Tornado") {
    document.getElementById("weatherAppContatiner").style.backgroundImage =
      "url('./images/Tornado.gif')";
  } else if (
    response.data.weather[0].main == "Sand" ||
    response.data.weather[0].main == "Dust" ||
    response.data.weather[0].main == "Ash"
  ) {
    document.getElementById("weatherAppContatiner").style.backgroundImage =
      "url('./images/Sand.gif')";
  }

  document.getElementById("weatherAppContatiner").style.backgroundSize =
    "100% 100%";

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "c4b172eedcc31d3b2dcffd5a7db9d456";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

search("Cape Town");
