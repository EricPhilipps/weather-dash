const myKey = "cc50518f37e2ddd6b048abeecab6ec3e";
const searchedCity = $('#search-location');
const searchBtn = $('#search-btn');
const temp = $('#temp');
const wind = $('#wind');
const humidity = $('#humidity');
const uv = $('#uv');
let city = ""

function currentWeather (city) {
    let query = "http://api.openweathermap.org/geo/1.0/direct?q=" +city+"&limit=5" +"&appid=" +myKey;
    console.log(query);
    fetch(query)
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((data) => {
        let lat = data[0].lat;
        let lon = data[0].lon;

        let secondQuery = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&limit=5&units=imperial&appid=" +myKey;
        
        fetch(secondQuery)
        .then ((response) => {
            return response.json();
        })
        .then((data) => {
            temp.text("Temperature: " + data.current.temp + "F");
            wind.text("Wind Speed: " + data.current.wind_speed + "MPH");
            humidity.text("Humidity: " + data.current.humidity + "%");
            uv.text("UV Index: " + data.current.uvi);
        })
    })
}

searchBtn.on("click", function(e) {
    e.preventDefault();
    city = searchedCity.val();
    console.log('hello');
    currentWeather(city);
})