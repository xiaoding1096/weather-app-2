// This is a structure of weather app demo and this one without a API.
const dayOfFuture = document.getElementById("dayoffuture-wrapper");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const todayCity = document.getElementById("today-city");
const todayTemperature = document.querySelector(".today-temperature");
const dayoffutureDay = document.querySelector(".dayoffuture-day");

//line 8 to line 13 will help don't reload page when we submit,return a null value in input when we have written something and run a function displayWeather
searchForm.addEventListener("submit", searchInfoWeatherCity);
function searchInfoWeatherCity(event) {
  event.preventDefault();

  displayWeatherToday();
  // displayWeatherNext8days();
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

  todayCity.innerHTML = data.resolvedAddress;
  todayTemperature.innerHTML = data.currentConditions.temp;
}

//this function allow we display information when we have written something to input through create a new object, add a class for that object and add html content in that
async function displayWeatherNext8days() {
  let citySearch = searchInput.value.trim();
  let apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${citySearch}?key=579XEPE66XU8KA92CEUPVGEE9 `;

  let data = await fetch(apiURL)
    .then((response) => response.json())
    .catch((error) => {
      alert("Something Went Wrong: Try Checking Your Internet Coneciton");
    });
  // anh ơi em muốn hỏi ở chỗ này đi xuống em không biết cách tham chiếu như thế nào để api có thể tham chiếu vào đây
  data.days.forEach((day) => {
    const newDivItem = document.createElement("div");
    newDivItem.classList.add("dayoffuture_day");

    newDivItem.innerHTML = `
    <span class="dayoffuture-day"></span> 
        <img src="./img/sun.png" alt="" class="img-dayoffuture_icon" />
        <div class="dayoffuture-minmax-temperature">
        <span class="dayoffuture-minmax">${data.days[0].tempmin}</span>
        <span class="dayoffuture-minmax">${data.days[0].tempmax}</span>
        </div>
    `;
    dayOfFuture.appendChild(newDivItem);
  });
}
