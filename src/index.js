function formatDate(inputDate) {
  let hours = inputDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = inputDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = inputDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${days[dayIndex]} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiKey = "eb74577a92b309d6ea5914a086880563";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
  });
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 32;
}

function updateDate() {
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showLocation(position) {
  let apiKey = "eb74577a92b309d6ea5914a086880563";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
  });
}

let searchForm = document.querySelector("#search-button");
let celciusLink = document.querySelector("#celcius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
let currentLocationButton = document.querySelector("#current-location-button");

celciusLink.addEventListener("click", convertToCelcius);
fahrenheitLink.addEventListener("click", convertToFahrenheit);
searchForm.addEventListener("submit", search);
currentLocationButton.addEventListener("click", getCurrentLocation);

updateDate();
