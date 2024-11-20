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
//line 8 to line 13 will help don't reload page when we submit,return a null value in input when we have written something and run a function displayWeather
searchForm.addEventListener("submit", searchInfoWeatherCity);
function searchInfoWeatherCity(event) {
  event.preventDefault();

  displayWeatherToday();
  displayWeatherNext8days();
  searchInput.value = "";
}
// this function will get information from api and render to object "today" in html
async function displayWeatherToday() {
  let citySearch = searchInput.value.trim();

  let apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${citySearch}?key=579XEPE66XU8KA92CEUPVGEE9 `;

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
  todayTemperature.innerHTML = Math.round(
    ((data.currentConditions.temp - 32) * 5) / 9
  );
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
        <img src="${day.icon}" alt="" class=" img-dayoffuture_icon" />
        <div class="dayoffuture-minmax-temperature">
        <div>
        <span>Min</span>
        <span class="dayoffuture-minmax">${Math.round(
          ((day.tempmin - 32) * 5) / 9
        )}</span>
        </div>
        <div>
        <span>Max</span>
        <span class="dayoffuture-minmax">${Math.round(
          ((day.tempmax - 32) * 5) / 9
        )}</span>
        </div>
        </div>
    `;

    dayOfFuture.appendChild(newDivItem);
  });
}

//add day time
// add user position make that is default when dont have input
//add info have not finished
