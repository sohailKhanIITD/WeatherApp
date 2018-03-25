// JavaScript source code
var err = document.createElement('p');
var latitude ;
var longitude;
var geoAPI;
var headr = document.getElementById("head");
var p1 = document.getElementById("type");
var p2 = document.getElementById("temp");
var p3 = document.getElementById("humidity");
var p4 = document.getElementById("Wind");
var p5 = document.getElementById("WindD");
var img = document.getElementById("image");
var width = window.innerWidth;


function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

if (!navigator.geolocation) {
    err.textContent = " POKMON ";
    document.body.appendChild(err);
}

function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    geoAPI = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=a6a3e2d162e235eacc48019a7e5cf760';
    $.getJSON(geoAPI, weatherCallBack);
}

function error() {
    err.textContent = "ERROR";
    document.body.appendChild(err);
}

navigator.geolocation.getCurrentPosition(success, error);

function weatherCallBack(weatherData) {
    console.log(weatherData);
    headr.innerHTML = "Weather Of " + weatherData.name + ' ,' + weatherData.sys.country;
    var lowT = weatherData.main.temp_min - 273.15;
    var highT = weatherData.main.temp_max - 273.15;
    var T = weatherData.main.temp - 273.15;
    var type = weatherData.weather[0].main;
    var humi = weatherData.main.humidity;
    var windSPD = weatherData.wind.speed;
    var windDir = weatherData.wind.deg;
    var visi = weatherData.visibility;

    p1.innerHTML = type + '  ' + round(T,1) + '  	\xB0 C';
    p2.innerHTML = 'Low : ' + round(lowT, 1) + ' \xB0 C  ||  High : ' + round(highT,1) + ' \xB0 C';
    p3.innerHTML = 'Humidity :  ' + humi + '% ||  Visiblity :  ' + visi+'  m';
    p4.innerHTML = 'Wind Speed :  ' + windSPD + 'mph';
    p5.innerHTML = windDir + ' \xB0 North<br />Clockwise';

    p2.style.paddingLeft = (width / 2 - 164)+'px';
    p1.style.paddingLeft = (width / 2 - 164) + 'px';
    p3.style.paddingLeft = (width / 2 - 164) + 'px';
    p4.style.paddingLeft = (width / 2 - 164) + 'px';
    
    img.style.transform = 'rotate(' + windDir + 'deg)';
};

$(window).resize(function () {
    width = window.innerWidth;
    p2.style.paddingLeft = (width / 2 - 164) + 'px';
    p1.style.paddingLeft = (width / 2 - 164) + 'px';
    p3.style.paddingLeft = (width / 2 - 164) + 'px';
    p4.style.paddingLeft = (width / 2 - 164) + 'px';
});
