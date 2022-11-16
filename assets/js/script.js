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
            temp.text("Temperature: " + data.current.temp + "F");
            wind.text("Wind Speed: " + data.current.wind_speed + "MPH");
            humidity.text("Humidity: " + data.current.humidity + "%");
            uv.text("UV Index: " + data.current.uvi);
            description.text(data.current.weather[0].description);
            futureWeather(data);
        })
    })
}

function futureWeather (weatherData) {
    
}

searchBtn.on("click", function(e) {
    e.preventDefault();
    city = searchedCity.val();
    cityTitle.text(searchedCity.val());
    currentWeather(city);
    
})