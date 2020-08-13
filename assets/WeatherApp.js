// initial array of saved 
let citiesList = JSON.parse(localStorage.getItem("savedCitiesList") || "[]");


let selectCity = "";
renderCityButtons(citiesList); 

//search city
$(document).ready(function() {
    $("#search").on("click", function() {
        $("#chosenCity").empty();

        var selectCity = $("#city-input").val();     

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + selectCity + "&appid=33c63abdc074bfb89c02e1a51923b28a";        
  
// Creates AJAX call for the specific movie button being clicked       
        $.ajax({
            url:"https://api.openweathermap.org/data/2.5/weather?q=" + selectCity + "&appid=33c63abdc074bfb89c02e1a51923b28a",
            method: "GET"
        }).then(function forecast(response) {
          console.log(response);
// console.log our data request so we know what we're working with

            const cityName = $("<h2>").attr("font-size", "30px").attr("font-weight", "bold");
            const weatherIcon = $('<img />').attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
            const weatherDescription = $("<p>");
            const temperature = $("<p>");
            const humidity = $("<p>");
            const dateTime = (response.dt);

//convert unixtimestamp

                var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                var date = new Date(dateTime*1000);
                var year = date.getFullYear();
                var month = months_arr[date.getMonth()];
                var day = date.getDate();
            
// Display date time in MM-dd-yyyy format
            var convdateTime = month+'-'+day+'-'+year;
            console.log(convdateTime);
            
            
            var fahrenheitTemp = Math.floor((response.main.temp - 273.15) * 1.8 + 32); 

// Displays the chosen city
            cityName.text(response.name + "            " + convdateTime);
            weatherDescription.text("Currently: " + response.weather[0].main);
            temperature.text("Current Temperature: "  + fahrenheitTemp + " F");                    
            humidity.text("Humidity: "  + response.main.humidity + "%");

//All items can be chained in jQuery.
            $("#chosenCity").prepend(cityName, weatherIcon, weatherDescription, temperature, humidity);

        });
    }); 
});

//add city
$("#add-city").on("click", function addCity(){
        var newCity = $(selectCity).val();
        citiesList.push(newCity);
        console.log(citiesList);
        localStorage.setItem("savedCitiesList", JSON.stringify(citiesList));
 });

//create city buttons
function renderCityButtons(array) {
        $('#citiesList').empty();
        for (var i = 0; i < citiesList.length; i++) {
        var x = $("<button>").addClass("city").attr("data-name", citiesList[i]).text(citiesList[i]);
        $("#citiesList").append(x); 
        }
}
renderCityButtons ();

//add event listener to all city buttons
 $(".city").on("click", function (){
        selectCity = $(this).attr("data-name");
        forecast(selectCity);
});

//five day forecasts
 /*           const cityName = $("<h2>").attr("font-size", "30px").attr("font-weight", "bold");
            const currentTime = $("<p>");
            const weatherIcon = $('<img />').attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
            const temperature = $("<p>");
            const humidity = $("<p>");

for (var f = 1; f<=33; f += 8) {
date1.text(response.list[f].dt_txt);
currentWeather1.text('Weather: ' + response.list[f].weather[0].description);
cityTemp1.text('Temperature: ' + response.main.temp);
cityHumid1.text('Humidity: ' + response.list[f].main.humidity);

}*/