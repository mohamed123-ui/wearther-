let searchInput = document.querySelector('input');
searchInput.addEventListener('input', function () {
    getApi(searchInput.value);
});

let data = [];
getApi("cairo");
async function getApi(city) {

try {

        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=222dc7af7f674fd8b19182554241412&q=${city}&days=3`);
        if (response.ok) {
            let finalResponse = await response.json();
            data = finalResponse;
        }
        display(data);
} catch (error) {
    alert('data is invalide')
}
}

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDay(offset = 0) {
    const toDay = new Date();
    return daysOfWeek[(toDay.getDay() + offset) % 7];
}

function getMonth() {
    const toDay = new Date();
    return months[toDay.getMonth()];
}
function getWeatherForUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showWeather, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  function showWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getCityByCoordinates(lat, lon);
}
async function getCityByCoordinates(lad,lon) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=222dc7af7f674fd8b19182554241412&q=${lad,lon}&days=3`);
if(response.ok){
    let finalResponse=await response.json();
    data=finalResponse;
}
    } catch (error) {
        alert('invalid data')
    }
}
function display(data) {
    let container = `
        <div class="col-md-4">
            <div class="today-forecast">
                <div class="header-forecast d-flex justify-content-between">
                    <div class="day"><h5>${getDay()}</h5></div>
                    <div class="date"><h5>${getMonth()}</h5></div>
                </div>
                <div class="today-forecast-content ps-2">
                    <div class="location">
                        <h3>${data.location.name}</h3>
                    </div>
                    <div class="degree">
                        <p class="deg">${data.current.temp_c} <sup>o</sup>C</p>
                    </div>
                    <div class="icon">
                        <img src="https:${data.current.condition.icon}" alt="Weather Icon">
                    </div>
                    <div class="weather-custom">
                        <p>${data.current.condition.text}</p>
                        <span><i class="fa-solid fa-umbrella"></i> ${data.current.feelslike_c}%</span>
                        <span><i class="fa-solid fa-wind"></i> ${data.current.wind_kph} km/h</span>
                        <span><i class="fa-solid fa-gauge"></i> ${data.current.wind_dir}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="forecast text-center">
                <div class="header-content">
                    <h5 class="text-center py-1">${getDay(1)}</h5>
                </div>
                <div class="icon py-2">
                    <img src="https:${data.forecast.forecastday[1].day.condition.icon}" alt="Weather Icon">
                </div>
                <div class="degree">
                    <p>${data.forecast.forecastday[1].day.maxtemp_c} <sup>o</sup>C</p>
                    <p>${data.forecast.forecastday[1].day.mintemp_c} <sup>o</sup>C</p>
                </div>
                <div class="weather-custom">
                    <p>${data.forecast.forecastday[1].day.condition.text}</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="forecast-sec text-center">
                <div class="header-content">
                    <h5>${getDay(2)}</h5>
                </div>
                <div class="icon py-2">
                    <img src="https:${data.forecast.forecastday[2].day.condition.icon}" alt="Weather Icon">
                </div>
                <div class="degree">
                    <p>${data.forecast.forecastday[2].day.maxtemp_c} <sup>o</sup>C</p>
                    <p>${data.forecast.forecastday[2].day.mintemp_c} <sup>o</sup>C</p>
                </div>
                <div class="weather-custom">
                    <p>${data.forecast.forecastday[2].day.condition.text}</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById('rowData').innerHTML = container;
}
