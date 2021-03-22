function formatDate (timestamp) {
  let now = new Date (timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[now.getDay()];
return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let now = new Date (timestamp);
  let hours = now.getHours();
  if(hours < 10){
  hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if(minutes < 10){
  minutes = `0${minutes}`;  
}
return `${hours}:${minutes}`;
}

function displayForecast (response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for(let index = 0; index < 6; index ++){
    forecast = response.data.list[index];
    forecastElement.innerHTML +=
     `<div class="col-md-2">
          <div class="card day">
             <div class="card-body">
                 <p>
                      ${formatHours(forecast.dt*1000)}
                      <br />
                      <i class="${iconCodes[0][forecast.weather[0].icon]}"></i>
                </p>
                <p>
                  <strong id="max-temp">${Math.round(forecast.main.temp_max)}º</strong>
                  <span id="min-temp">${Math.round(forecast.main.temp_min)}º</span>
                </p>
               </div>
              </div>
            </div>`;                   
  }                  
  
}

function searchCity (city){
  let apiKey = "66d807cb5401e2d37e109b69127e15b2";
  let unit = "Metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}


function submitSearch(event){
  event.preventDefault();
  let searchInput = document.querySelector("#search-text").value;
  searchCity(searchInput);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitSearch);

let iconCodes = [
    {'01d':'fas fa-sun',  
    '01n':'fas fa-moon',
    '02d':'fas fa-cloud-sun',
    '02n':'fas fa-cloud-moon',
    '03d':'fas fa-cloud',
    '03n':'fas fa-cloud',
    '04d':'fas fa-cloud',
    '04n':'fas fa-cloud',
    '09d':'fas fa-cloud-showers-heavy',
    '09n':'fas fa-cloud-showers-heavy',
    '10d':'fas fa-cloud-sun-rain',
    '10n':'fas fa-cloud-moon-rain',
    '11d':'fas fa-bolt',
    '11n':'fas fa-bolt',
    '13d':'far fa-snowflake',
    '13n':'far fa-snowflake',
    '50d':'fas fa-smog',  // day mist   
    '50n':'fas fa-smog'  // night mist    
   }
  ];

function showTemp(response){
  document.querySelector("#city").innerHTML=response.data.name;
  document.querySelector("#country").innerHTML=response.data.sys.country;

  document.querySelector("#main-temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("h3").innerHTML = response.data.weather[0].main;
  
  celsiusTemp = response.data.main.temp;

  let currentHumidity = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity}%`;
  
  let currentWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${currentWind} km/h`;
  let currentDate = document.querySelector("#day-time");
  currentDate.innerHTML = formatDate(response.data.dt*1000);
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute ("class", iconCodes[0][response.data.weather[0].icon]);

}

//Current Button//

function showPosition(position) {
  let apiKey = "66d807cb5401e2d37e109b69127e15b2";
  let unit = "Metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
  
}
navigator.geolocation.getCurrentPosition(showPosition);

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);

searchCity("Toronto");


//Unit Conversion//

function showFahTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#main-temp");
  let maxTemp = document.querySelector("#max-temp");
  let minTemp = document.querySelector("#min-temp");


  celsiusLink.classList.remove("active");
  fLink.classList.add("active");
  let fTemp = (celsiusTemp*9)/5 + 32;
  tempElement.innerHTML= Math.round(fTemp);
  maxTemp.innerHTML= Math.round(fTemp);
  minTemp.innerHTML= Math.round(fTemp);
}


function showCelTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#main-temp");
  let maxTemp = document.querySelector("#max-temp");
  let minTemp = document.querySelector("#min-temp");

  celsiusLink.classList.add("active");
  fLink.classList.remove("active");
  tempElement.innerHTML= Math.round(celsiusTemp);
  maxTemp.innerHTML= Math.round(celsiusTemp);
  minTemp.innerHTML= Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fLink = document.querySelector("#f-link");
fLink.addEventListener("click", showFahTemp);

let celsiusLink = document.querySelector("#c-link");
celsiusLink.addEventListener("click", showCelTemp);




