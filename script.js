// Time
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12;
    
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds} ${period}`;
    
    const timeElement = document.querySelector('.time');
    if (timeElement) {
      timeElement.textContent = timeString;
    }
  }
  setInterval(updateTime, 1000);
  updateTime();
  
  
  // Weather
  function fetchWeatherData() {
    const apiKey = "848f1a5fa3a7bfefdd783073aa57259d";
    const city = "Philadelphia";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Weather data:", data);
        
        // Update temperature and feels like
        const currentTemp = Math.round(data.main.temp);
        const feelsLikeTemp = Math.round(data.main.feels_like);
        const temperatureElement = document.querySelector('.temperature');
        if (temperatureElement) {
          temperatureElement.textContent = `${currentTemp}°`;
        }
        const feelsElement = document.querySelector('.feels');
        if (feelsElement) {
          feelsElement.textContent = `Feels Like: ${feelsLikeTemp}°`;
        }
        
        // Update high and low temperatures
        const highTemp = Math.round(data.main.temp_max);
        const lowTemp = Math.round(data.main.temp_min);
        const highElement = document.querySelector('.high');
        const lowElement = document.querySelector('.low');
        if (highElement) {
          highElement.textContent = `H: ${highTemp}°`;
        }
        if (lowElement) {
          lowElement.textContent = `L: ${lowTemp}°`;
        }
        
        // Update sunrise and sunset
        if (data.sys) {
          const sunriseUnix = data.sys.sunrise;
          const sunsetUnix = data.sys.sunset;
          const sunriseDate = new Date(sunriseUnix * 1000);
          const sunsetDate = new Date(sunsetUnix * 1000);
         
          // Format
          const sunriseTime = sunriseDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          const sunsetTime = sunsetDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          const sunriseElement = document.querySelector('.sunrise');
          const sunsetElement = document.querySelector('.sunset');
          if (sunriseElement) {
            sunriseElement.textContent = `Sunrise: ${sunriseTime}`;
          }
          if (sunsetElement) {
            sunsetElement.textContent = `Sunset: ${sunsetTime}`;
          }
        }
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
  }
  fetchWeatherData();
  setInterval(fetchWeatherData, 600000); // Refresh
  
  // Air Quality
  function fetchAirQuality() {
    const lat = 39.9526;    
    const lon = -75.1652;   
    const apiKey = "848f1a5fa3a7bfefdd783073aa57259d"; 
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const aqi = data.list[0].main.aqi;
        let quality;
        switch (aqi) {
          case 1: quality = "Good"; break;
          case 2: quality = "Fair"; break;
          case 3: quality = "Moderate"; break;
          case 4: quality = "Poor"; break;
          case 5: quality = "Very Poor"; break;
          default: quality = "Unknown"; break;
        }
        const airQualityElement = document.querySelector('.air-quality');
        if (airQualityElement) {
          airQualityElement.textContent = `Air Quality: ${quality}`;
        }
      })
      .catch(error => {
        console.error("Error fetching air quality data:", error);
      });
  }
  fetchAirQuality();
  setInterval(fetchAirQuality, 600000);  // Refresh
