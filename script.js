const apiKey = "167d61135d246eef208c1295532c1968";
const searchButton = document.querySelector("button");
searchButton.addEventListener("click", searchWeather);
function searchWeather() {
  const searchInput = document.querySelector("input").value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
      displayForecast(searchInput);
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayWeather(data) {
  const weatherIcon = document.querySelector(".weather-icon");
  const temperature = document.querySelector(".temperature");
  const weatherConditions = document.querySelector(".weather-conditions");
  const humidity = document.querySelector(".humidity");
  const windSpeed = document.querySelector(".wind-speed");

  weatherIcon.style.backgroundImage = `url('http://openweathermap.org/img/w/${data.weather[0].icon}.png')`;
  temperature.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
  weatherConditions.innerHTML = data.weather[0].description;
  humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
  windSpeed.innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
}

fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=New%20York&appid=${apiKey}&units=metric`
)
  .then((response) => response.json())
  .then((data) => {
    displayForecast(data);
  })
  .catch((error) => {
    console.log(error);
  });

function displayForecast(cityName) {
  const forecastDays = document.querySelectorAll(".day");
  let dayIndex = 0;
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.includes("12:00:00")) {
          const forecastDate = new Date(data.list[i].dt_txt);
          const forecastDay = forecastDate.toLocaleString("default", {
            weekday: "long",
          });
          const forecastIcon = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
          const forecastTemp = `${Math.round(data.list[i].main.temp)}&deg;C`;
          const forecastHTML = `
              <p>${forecastDay}</p>
              <div class="forecast-icon" style="background-image: url('${forecastIcon}');"></div>
              <p>${forecastTemp}</p>
            `;
          forecastDays[dayIndex].innerHTML = forecastHTML;
          dayIndex++;
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
