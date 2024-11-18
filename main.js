// This is a structure of weather app demo and this one without a API.
const dayOfFuture = document.getElementById("dayoffuture-wrapper");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
// we
let data = ["day 1","day 2","day 3","day 4","day 5","day 6","day 7",]
//line 8 to line 13 will help don't reload page when we submit,return a null value in input when we have written something and run a function displayWeather
searchForm.addEventListener("submit", searchInfoWeatherCity);
function searchInfoWeatherCity(event) {
  event.preventDefault();
  searchInput.value = "";
  displayWeather();
}

//this function allow we display information when we have written something to input through create a new object, add a class for that object and add html content in that
function displayWeather() {
    data.forEach( data => {
    const newDivItem = document.createElement("div");
    newDivItem.classList.add("dayoffuture_day");
    newDivItem.innerHTML = `
        <span class="dayoffuture-day">${data}</span>
        <img src="./img/sun.png" alt="" class="img-dayoffuture_icon" />
        <div class="dayoffuture-minmax-temperature">
        <span class="dayoffuture-minmax">10</span>
        <span class="dayoffuture-minmax">30</span>
        </div>
    `;
    dayOfFuture.appendChild(newDivItem);
    });
}