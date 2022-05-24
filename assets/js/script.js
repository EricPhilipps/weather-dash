const myKey = "cc50518f37e2ddd6b048abeecab6ec3e";
const searchedCity = $('#search-location');
const searchBtn = $('#search-btn')

function currentWeather () {
    let city = searchedCity;

    let query = "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial" +
        "&appid" +
        myKey;
    
    fetch(query)
    .then((res) => {
        res.json();
    })
    .then
}