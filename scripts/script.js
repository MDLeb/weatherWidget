let cities = [
    {   
        country: "Belarus",
        name:"Minsk",
        latitude:"53.9006",
        longitude:"27.5590",
    },
    {
        country: "United Arab Emirates",
        name:"Dubai",
        latitude:"25.1547",
        longitude:"55.1750",
    },
    {
        country: "Russia",
        name:"St.Petersburg",
        latitude:"59.57",
        longitude:"30.19",
    },
    {
        country: "Norway",
        name:"Oslo",
        latitude:"59.5440",
        longitude:"10.4510",
    },
    {
        country: "Russia",
        name:"Moscow",
        latitude:"55.4521",
        longitude:"37.372",
    },
    {
        country: "United Kingdom",
        name:"London",
        latitude:"51.3126",
        longitude:"0.739",
    },
    {
        country: "United States",
        name:"New York",
        latitude:"40.4246",
        longitude:"74.0022",
    },
]

const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
function handleSelecte(event) {
    let city = cities.find((item) => {
        if (item.name === event.currentTarget.value) {
            return item;
        }
    });
    setData (city);
}
function setImg(iconName) {
    switch(iconName) {
        case '01d':
         case '01n':    
           return "source/icons/sun-gr.png";
        case '02d':
            return "source/icons/CS.png";
        case '04d':
        case '03d': 
        case '04n':
            return "source/icons/Cloud.png";
        default:
           return `https://openweathermap.org/img/wn/${iconName}@2x.png`;
      }
}

function setData (city) {
    document.querySelector(".country").textContent = city.country;
    document.querySelector(".city").textContent = city.name;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.latitude}&lon=${city.longitude}&exclude=minutely,hourly&appid=882b97da4ca29a5ccba6d61a9066600b`)
    .then(response => response.json())
    .then(data => {
        document.querySelector(".weather-icon").setAttribute("src", `${setImg(data.current.weather[0].icon)}`);
        document.querySelector(".temperature-today").textContent = Math.round(data.current.temp - 273.15);
        document.querySelector(".weather-today").querySelector(".day").textContent = week[new Date(data.daily[0].dt*1000).getDay()] + " " + new Date(data.daily[0].dt*1000).getDate();
        document.querySelector(".weather-today").querySelector(".wind").textContent = data.daily[0].wind_speed;

        
        for (let i = 0, weatherItems = document.querySelectorAll(".weather-week"); i < weatherItems.length; i++) {
            weatherItems[i].querySelector(".temperature-today").textContent = Math.round(data.daily[i+1].temp.day - 273.15);
            weatherItems[i].querySelector("img").setAttribute("src", setImg(data.daily[i+1].weather[0].icon));
            weatherItems[i].querySelector(".day").textContent = week[new Date(data.daily[i+1].dt*1000).getDay()].slice(0, 3).toUpperCase();
        }
    });
}

setData(cities[0]);