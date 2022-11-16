// const moment = require('moment');
// example data url: https://api.openweathermap.org/data/2.5/onecall?lat=40.7127281&lon=-74.0060152&exclude=minutely,hourly,alerts&limit=5&units=imperial&appid=cc50518f37e2ddd6b048abeecab6ec3e

const myKey = "cc50518f37e2ddd6b048abeecab6ec3e";
const searchedCity = $('#search-location');
const searchBtn = $('#search-btn');
const temp = $('#temp');
const wind = $('#wind');
const humidity = $('#humidity');
const uv = $('#uv');
const currIcon = $('#current-icon');
const description = $('#description');
const cityTitle = $('#city-title');
const sevenDay = $("#seven-day")

let city = ""

function currentWeather (city) {
    let query = "http://api.openweathermap.org/geo/1.0/direct?q=" +city+"&limit=5" +"&appid=" +myKey;
    fetch(query)
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((data) => {
        let lat = data[0].lat;
        let lon = data[0].lon;

        let secondQuery = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&limit=5&units=imperial&appid=" +myKey;
        
        console.log(secondQuery);
        fetch(secondQuery)
        .then ((response) => {
            return response.json();
        })
        .then((data) => {
            currIcon.attr('src', `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`);
            description.text(data.current.weather[0].description);
            temp.text("Temperature: " + data.current.temp + "F");
            wind.text("Wind Speed: " + Math.round(data.current.wind_speed) + "mph");
            humidity.text("Humidity: " + data.current.humidity + "%");
            uv.text("UV Index: " + data.current.uvi);
            futureWeather(data);
        })
    })
}

function futureWeather (weatherData) {
    console.log(weatherData);

    for (let i = 0; i < 6; i++) {
        const futureInfo = {
            iconCode: weatherData.daily[i].weather[0].icon,
            date: weatherData.daily[i].dt,
            temp: weatherData.daily[i].temp.max,
            wind: Math.round(weatherData.daily[i].wind_speed),
            humidity: weatherData.daily[i].humidity,
            description: weatherData.daily[i].weather[0].main,
            uv: weatherData.daily[i].uvi
        }

        console.log(futureInfo.iconCode);

        let iconURL = `https://openweathermap.org/img/w/${futureInfo.iconCode}.png`

        let futureDayForecast = $(`
            <div class="card">
                <img src="${iconURL}"/>
                <div class="card-body">
                    <h5 class="card-title" id=${"date" + i}>${futureInfo.date}</h5>
                    <ul>
                        <li id=${"description" + i}>${futureInfo.description}</li>
                        <li id=${"temp" + i}>Temperature: ${futureInfo.temp} F</li>
                        <li id=${"wind" + i}>Wind Speed: ${futureInfo.wind} mph</li>
                        <li id=${"humidity" + i}>Humidity: ${futureInfo.humidity} %</li>
                        <li id=${"uv" + i}>UV Index: ${futureInfo.uv}</li>
                    </ul>
                </div>
            </div>
        `);
    
        sevenDay.append(futureDayForecast);

    }
}

searchBtn.on("click", function(e) {
    e.preventDefault();
    city = searchedCity.val();
    cityTitle.text(searchedCity.val());
    currentWeather(city);
    
})