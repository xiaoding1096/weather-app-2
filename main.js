// This is a structure of weather app demo and this one without a API.
const dayOfFuture = document.getElementById("dayoffuture-wrapper");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const todayCity = document.getElementById("today-city");
const todayTemperature = document.querySelector(".today-temperature");
const dayoffutureDay = document.querySelector(".dayoffuture-day");
const conditions = document.querySelector(".conditions-info");
const feelslike = document.querySelector(".feelslike-info");
const humidity = document.querySelector(".humidity-info");
const visibility = document.querySelector(".visibility-info");
const sunrise = document.querySelector(".sunrise-info");
const sunset = document.querySelector(".sunset-info");
// let userLocationAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a1a59d2f73eeb4a3e6a24a861af886e4`;
//This function will help don't reload page when we submit,return a null value in input when we have written something and run a function displayWeather
searchForm.addEventListener("submit", searchInfoWeatherCity);
function searchInfoWeatherCity(event) {
  event.preventDefault();

  displayWeatherToday();
  displayWeatherNext8days();
  searchInput.value = "";
}

const getLocation = document.getElementById("change-temperature");
getLocation.addEventListener("click", getUserLocation);
function getUserLocation() {
  const success = async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(position);
    userLocationAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=579XEPE66XU8KA92CEUPVGEE9`;

    let userData = await fetch(userLocationAPI)
      .then((response) => response.json())
      .catch((error) =>
        alert("Something Went Wrong: Try Checking Your Internet Coneciton")
      );
    console.log(userData);

    conditions.innerHTML = userData.currentConditions.conditions;
    feelslike.innerHTML = Math.round(
      ((userData.currentConditions.feelslike - 32) * 5) / 9
    );
    todayTemperature.innerHTML =
      Math.round(((userData.currentConditions.temp - 32) * 5) / 9) + "°C";
    humidity.innerHTML = userData.currentConditions.humidity + " %";
    visibility.innerHTML = userData.currentConditions.visibility + " K/m";
    sunrise.innerHTML = userData.currentConditions.sunrise;
    sunset.innerHTML = userData.currentConditions.sunset;
    todayCity.innerHTML = userData.resolvedAddress;

    dayOfFuture.innerText = "";
    userData.days.forEach((day) => {
      const newDivItem = document.createElement("div");
      newDivItem.classList.add("dayoffuture_day");
      newDivItem.innerHTML = `
    <span class="dayoffuture-day">${day.datetime}</span> 
        <img src="./icon/${day.icon}.png" alt="" class="img-dayoffuture_icon" />
        <div class="dayoffuture-minmax-temperature">
        <div>
        <span>Min</span>
        <span class="dayoffuture-minmax">${Math.round(
          ((day.tempmin - 32) * 5) / 9
        )}°C</span>
        </div>
        <div>
        <span>Max</span>
        <span class="dayoffuture-minmax">${Math.round(
          ((day.tempmax - 32) * 5) / 9
        )}°C</span>
        </div>
        </div>
    `;

      dayOfFuture.appendChild(newDivItem);
    });
  };

  function error() {
    alert("Can't support for you");
  }
  navigator.geolocation.getCurrentPosition(success);
}

// this function will get information from api and render to object "today" in html
async function displayWeatherToday() {
  let citySearch = searchInput.value.trim();

  let apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${citySearch}?key=579XEPE66XU8KA92CEUPVGEE9&icons1`;
  // 579XEPE66XU8KA92CEUPVGEE9
  let data = await fetch(apiURL)
    .then((response) => response.json())
    .catch((error) => {
      alert("Something Went Wrong: Try Checking Your Internet Coneciton");
    });
  console.log(data);

  conditions.innerHTML = data.currentConditions.conditions;
  feelslike.innerHTML = Math.round(
    ((data.currentConditions.feelslike - 32) * 5) / 9
  );
  humidity.innerHTML = data.currentConditions.humidity + " %";
  visibility.innerHTML = data.currentConditions.visibility + " K/m";
  sunrise.innerHTML = data.currentConditions.sunrise;
  sunset.innerHTML = data.currentConditions.sunset;
  todayCity.innerHTML = data.resolvedAddress;
  todayTemperature.innerHTML =
    Math.round(((data.currentConditions.temp - 32) * 5) / 9) + "°C";
}

//this function allow we display information when we have written something to input through create a new object, add a class for that object and add html content in that
async function displayWeatherNext8days() {
  let citySearch = searchInput.value.trim();

  let apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline//${citySearch}?key=579XEPE66XU8KA92CEUPVGEE9&icons1`;

  let data = await fetch(apiURL)
    .then((response) => response.json())
    .catch((error) => {
      alert("Something Went Wrong: Try Checking Your Internet Coneciton");
    });

  dayOfFuture.innerText = "";
  data.days.forEach((day) => {
    const newDivItem = document.createElement("div");
    newDivItem.classList.add("dayoffuture_day");
    newDivItem.innerHTML = `
    <span class="dayoffuture-day">${day.datetime}</span> 
        <img src="./icon/${day.icon}.png" alt="" class="${
      day.icon
    } img-dayoffuture_icon" />
        <div class="dayoffuture-minmax-temperature">
        <div>
        <span>Min</span>
        <span class="dayoffuture-minmax">${Math.round(
          ((day.tempmin - 32) * 5) / 9
        )}°C</span>
        </div>
        <div>
        <span>Max</span>
        <span class="dayoffuture-minmax">${Math.round(
          ((day.tempmax - 32) * 5) / 9
        )}°C</span>
        </div>
        </div>
    `;

    dayOfFuture.appendChild(newDivItem);
  });
}

//add day time
// add user position make that is default when dont have input
//add info have not finished
