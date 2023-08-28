let now = new Date();

let span = document.getElementById("dateTimeNow");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let apiKey = "c4b172eedcc31d3b2dcffd5a7db9d456";

span.innerHTML = `${day} ${date} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text-input");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  let searchButtonClickUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(`${searchButtonClickUrl}`).then(showSearchTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showSearchTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;

  let temperatureElement = document.querySelector("#temperature");
  let Humidity = document.querySelector("#Humidity");
  let WindSpeed = document.querySelector("#WindSpeed");
  let description = document.querySelector("#temperature-description");
  let h1 = document.querySelector("#city");

  temperatureElement.innerHTML = `${temperature}°C`;
  description.innerHTML = response.data.weather[0].description;
  Humidity.innerHTML = `${humidity}%`;
  WindSpeed.innerHTML = `${wind}km/h`;
  h1.innerHTML = response.data.name;
}

function showCurrentTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;

  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#temperature-description");
  let h1 = document.querySelector("#city");
  let Humidity = document.querySelector("#Humidity");
  let WindSpeed = document.querySelector("#WindSpeed");

  temperatureElement.innerHTML = `${temperature}°C`;
  description.innerHTML = response.data.weather[0].description;
  h1.innerHTML = response.data.name;
  Humidity.innerHTML = `${humidity}%`;
  WindSpeed.innerHTML = `${wind}km/h`;
}

let long = "";
let lat = "";

function currentLocation(event) {
  lat = event.coords.latitude;
  long = event.coords.longitude;
}
navigator.geolocation.getCurrentPosition(currentLocation);

function searchLocation(position) {
  let apiKey = "c4b172eedcc31d3b2dcffd5a7db9d456";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

let currentButtonClick = document.querySelector("#currentButton");
currentButtonClick.addEventListener(
  "click",
  getCurrentLocation,
  axios.get(`${currentUrl}`).then(showCurrentTemperature)
);
