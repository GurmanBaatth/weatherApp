(function () {
    var inp = document.getElementById('inp');
    inp.focus();
    var btn = document.getElementById('btn');
    let locationtimezone = document.querySelector(".location-timezone");
    let temperaturedegree = document.querySelector(".temperature-degree");
    let temperaturesection = document.querySelector(".temperature");
    const temperaturespan = document.querySelector(".temperature span");
    let temperaturediscription = document.querySelector('.temperature-discription');
    let temperaturesunrise = document.querySelector(".sunrise");
    let temperaturesunset = document.querySelector(".sunset");
    let windspeed = document.querySelector(".wind")
    let humidity = document.querySelector(".humidity");
    let temperatureicon = document.querySelector(".icon");


    function networkRequest(val) {
        //display loader
        document.body.style.backgroundColor = '#000000';
        loader.style.display = 'block';

        var key = 'a78d17e424b5b8b5be0c7193c6912198';
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + val + '&appid=' + key)
            .then(function (data) {
                if (data.status !== 200) {
                    return;
                }
                data.json()
                    .then(function (data) {

                        //hideloader
                        document.body.style.backgroundColor = '#000000';
                        loader.style.display = 'none';

                        console.log(data);
                        locationtimezone.textContent = data.name;

                        //change kelvin into  celicus
                        //change the kelvin into degree
                        kelvin = data.main.temp;
                        var kelvin = Math.floor(data.main.temp);
                        var degree = Math.floor(kelvin - 273.15);
                        temperaturedegree.textContent = degree;


                        unix_timestamp = data.sys.sunrise;
                        temperaturesunrise.textContent = "Sunrise " + timeConverter(unix_timestamp);
                        //change sunset and sunrise into time
                        unix_timestamp = data.sys.sunset;
                        temperaturesunset.textContent = "Sunset " + timeConverter(unix_timestamp);
                        //set images
                        temperaturediscription.textContent = data.weather["0"].main;

                        switch (data.weather["0"].main) {
                            case 'Haze':
                                document.body.style.backgroundImage = 'url("https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")'
                                break;

                            case 'Clouds':
                                document.body.style.backgroundImage = 'url("https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")'
                                break;

                            case 'Rain':
                            case 'Mist':
                                document.body.style.backgroundImage = 'url("https://images.pexels.com/photos/1866690/pexels-photo-1866690.jpeg?cs=srgb&dl=benches-blurred-background-cold-1866690.jpg&fm=jpg")'
                                break;

                            case 'Thunderstorm':
                                document.body.style.backgroundImage = 'url("https://images.pexels.com/photos/53459/lightning-storm-weather-sky-53459.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")'
                                break;

                            case 'Snow':
                                document.body.style.backgroundImage = 'url("https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")'
                                break;
                            case 'Clear':
                                document.body.style.backgroundImage = 'url("https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=blue-sky-bright-clouds-912364.jpg&fm=jpg")'
                                break;
                            case 'Dust':
                                document.body.style.backgroundImage = 'url("https://images.rove.me/w_740,q_85/uuabmjulzx8i2nx9hcpq/israel-dust-storms-season.jpg")'
                                break;

                            default:
                                break;
                        }

                        //set icons
                        temperatureicon.src = 'http://openweathermap.org/img/w/' + data.weather["0"].icon + '.png';

                        windspeed.textContent = "Wind " + data.wind.speed + "km/h";
                        humidity.textContent = "Humidity " + data.main.humidity + "%";

                        function timeConverter(UNIX_timestamp) {
                            var a = new Date(UNIX_timestamp * 1000);
                            var hour = a.getHours();
                            var min = a.getMinutes();
                            var time = hour + ':' + min + " hours";
                            return time;

                        }

                        inp.value = ' ';
                        inp.focus();


                    })
            })

    }
    btn.onclick = function () {
        var value = inp.value;
        networkRequest(value);
    }
})()
