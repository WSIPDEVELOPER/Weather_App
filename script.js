let apiKey = "f0fee14aabf92d0adb96846415cfa0da";
let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en";

let searchBox = document.querySelector(".search input");
let searchButton = document.querySelector(".search button");
let weather_icon = document.querySelector(".weather-icon");
let cel; 
async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);

    if (!response.ok) {
      throw new Error("Try again.Error while fetching.");
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    const tempCelcius = Math.round(data.main.temp);
    document.querySelector(".temp").innerHTML = tempCelcius + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".pressure").innerHTML = data.main.pressure;
    document.querySelector('.feels-like').textContent = 'Feels like: ' + feelsLike;

    if (data.weather[0].main === "Clouds") {
      weather_icon.src = "image/cloud.png";
    } else if (data.weather[0].main === "Clear") {
      weather_icon.src = "image/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weather_icon.src = "image/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weather_icon.src = "image/dri.png";
    } else if (data.weather[0].main === "Mist") {
      weather_icon.src = "image/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".err").style.display = "none";
    cel = tempCelcius;
  } catch (error) {
    document.querySelector(".err").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    console.error(error);
  }
}

searchButton.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  }
});
