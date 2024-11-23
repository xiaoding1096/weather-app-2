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
// a variable initial but not used
const changeTemperature = document.getElementById("change-temperature");
const dayOfFutureMinMax = document.querySelector(".dayoffuture-minmax");

// This function allow we submit then run function searchInfoWeatherCity ()
searchForm.addEventListener("submit", searchInfoWeatherCity);

// function searchInfoWeatherCity() will excuted :

function searchInfoWeatherCity(event) {
  event.preventDefault(); // 1. not reload a page when submit
  displayWeatherToday(); // 2. run function displayWeatherToday()
  displayWeatherNext15days(); // 3.run function displayWeatherNext15days()
  searchInput.value = ""; // 4 . Delete a content we wrote to box input
}

// this function allow get user location :
function getUserLocation() {
  //if get success information will excuted this
  const success = async (position) => {
    const lat = position.coords.latitude; // get latitude of user
    const lon = position.coords.longitude; // get longitude of user
    console.log(lat + " " + lon);
    // this api will receive latitude and longitude then return latitude and longitude and information about weather
    userLocationAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=579XEPE66XU8KA92CEUPVGEE9`; // give latidude, longitude of user to api

    // receive information from api and give to variable userData
    let userData = await fetch(userLocationAPI)
      .then((response) => response.json())
      .catch((error) =>
        alert("Something Went Wrong: Try Checking Your Internet Coneciton")
      );

    console.log(userData); // we can see that information here

    // use that information and change to html
    conditions.innerHTML = userData.currentConditions.conditions;
    feelslike.innerHTML =
      Math.round(((userData.currentConditions.feelslike - 32) * 5) / 9) + "°C";
    todayTemperature.innerHTML =
      Math.round(((userData.currentConditions.temp - 32) * 5) / 9) + "°C";
    humidity.innerHTML = userData.currentConditions.humidity + " %";
    visibility.innerHTML = userData.currentConditions.visibility + " K/m";
    sunrise.innerHTML = userData.currentConditions.sunrise;
    sunset.innerHTML = userData.currentConditions.sunset;
    todayCity.innerHTML = "Weather Of Your Location";

    dayOfFuture.innerText = ""; // return content to "" before create a new div with new content inside

    //this method allow create a new div and new content
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

      dayOfFuture.appendChild(newDivItem); // all of new content will be contain by div dayOfFuture
    });
  };
  // if get fail information will executed this
  function error() {
    alert("Can't support for you");
  }
  // this method allow we get a information of user
  navigator.geolocation.getCurrentPosition(success, error);
}

// this function will get information from api and render to html of today information
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
  feelslike.innerHTML =
    Math.round(((data.currentConditions.feelslike - 32) * 5) / 9) + "°C";
  humidity.innerHTML = data.currentConditions.humidity + " %";
  visibility.innerHTML = data.currentConditions.visibility + " K/m";
  sunrise.innerHTML = data.currentConditions.sunrise;
  sunset.innerHTML = data.currentConditions.sunset;
  todayCity.innerHTML = data.resolvedAddress;
  todayTemperature.innerHTML =
    Math.round(((data.currentConditions.temp - 32) * 5) / 9) + "°C";
}

//this function allow we display information of next 15 days when we have written location to input and then create a new object, add a class for that object and add html content in that
async function displayWeatherNext15days() {
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
