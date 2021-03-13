function searchCity (city){
  let apiKey = "66d807cb5401e2d37e109b69127e15b2";
  let unit = "Metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}


function submitSearch(event){
  event.preventDefault();
  let searchInput = document.querySelector("#search-text").value;
  searchCity(searchInput);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitSearch);

function showTemp(response){
  document.querySelector("#city").innerHTML=response.data.name;
  document.querySelector("#country").innerHTML=response.data.sys.country;

  document.querySelector("#main-temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("h3").innerHTML = response.data.weather[0].main;
  
  let currentHumidity = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity}%`;
  
  let currentWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${currentWind} km/h`;

}
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

function formatDate (date) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hours = now.getHours();
if(hours < 10){
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if(minutes < 10){
  minutes = `0${minutes}`;
}
return `${day} ${hours}:${minutes}`;
}
let now = new Date ();
let h2 = document.querySelector("h2");

h2.innerHTML= formatDate(now);

//function changeTempF(event) {
  //event.preventDefault();
  //let temp = document.querySelector("#main-temp");
  //temp.innerHTML=`34`;
//}
//let mainTemp = document.querySelector("#f-temp");
//mainTemp.addEventListener("click", changeTempF);

//function changeTempC(event) {
  //event.preventDefault();
  //let tempC = document.querySelector("#main-temp");
  //tempC.innerHTML=`1`;
//}
//let mainTempC = document.querySelector("#c-temp");
//mainTempC.addEventListener("click", changeTempC);


  