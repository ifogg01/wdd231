async function getWeather() {
    const apiKey = "86493188d381051ddea532b770ad1bf1";
    const city = 'Trier';
    const country = 'DE';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();

        const temperature = data.main.temp;
        const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        const description = data.weather[0].description;

        document.getElementById('current-temp').textContent = temperature.toFixed(1);
        document.getElementById('weather-icon').src = weatherIcon;
        document.getElementById('weather-icon').alt = description;
        document.getElementById('weather-description').textContent = description;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('current-temp').textContent = 'N/A';
    }
}

getWeather();

setInterval(getWeather, 600000);
