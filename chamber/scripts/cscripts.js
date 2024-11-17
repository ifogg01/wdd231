document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");

    navToggle.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
        navToggle.classList.toggle("open");
    });

    loadMembers();
    updateLastModified();
    loadWeather();
    loadForecast();

    setupViewToggle(); 
});

function setupViewToggle() {
    const gridViewButton = document.getElementById("grid-view");
    const listViewButton = document.getElementById("list-view");
    const directory = document.querySelector(".business-directory");

    gridViewButton.addEventListener("click", function () {
        directory.classList.remove("list-view");
        gridViewButton.classList.add("active");
        listViewButton.classList.remove("active");
        updateViewMode("grid");
    });

    listViewButton.addEventListener("click", function () {
        directory.classList.add("list-view");
        gridViewButton.classList.remove("active");
        listViewButton.classList.add("active");
        updateViewMode("list");
    });
}

function updateViewMode(viewMode) {
    const businessCards = document.querySelectorAll(".business-card");
    businessCards.forEach((card) => {
        if (viewMode === "list") {
            card.classList.add("list-item");
        } else {
            card.classList.remove("list-item");
        }
    });
}

async function loadMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error("Failed to fetch members data");
        }

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displayMembers(members) {
    const directory = document.querySelector(".business-directory");
    directory.innerHTML = "";

    if (!members || members.length === 0) {
        directory.innerHTML = "<p>No members available to display.</p>";
        return;
    }

    members.forEach((member) => {
        const businessCard = document.createElement("div");
        businessCard.classList.add("business-card");

        businessCard.innerHTML = `
            <img src="${member.image}" alt="${member.name} image" class="business-image">
            <div>
                <h3>${member.name}</h3>
                <p>Membership Level: ${member.membership_level}</p>
                <p>Address: ${member.address}</p>
                <p>Phone: ${member.phone}</p>
                <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p>Description: ${member.description}</p>
            </div>
        `;

        directory.appendChild(businessCard);
    });

    console.log("Business directory populated with member data.");
}


function updateLastModified() {
    const lastModifiedElement = document.querySelector(".credits p:last-child");
    if (lastModifiedElement) {
        const lastModifiedDate = document.lastModified;
        lastModifiedElement.textContent = `© 2024 Tooele Chamber of Commerce - Last Modification: ${lastModifiedDate}`;
    } else {
        console.warn("Footer 'Last Modification' element not found.");
    }
}

async function loadWeather() {
    const apiKey = "86493188d381051ddea532b770ad1bf1"; 
    const city = "Tooele";
    const unit = "imperial"; 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error("Error loading weather:", error);
    }
}

function displayWeather(weatherData) {
    const weatherContainer = document.querySelector(".current-weather");
    weatherContainer.innerHTML = "";

    if (!weatherData || !weatherData.weather) {
        weatherContainer.innerHTML = "<p>Unable to retrieve weather data.</p>";
        return;
    }

    const { temp } = weatherData.main;
    const { description, icon } = weatherData.weather[0];
    const { name: city } = weatherData;

    const weatherHTML = `
        <h2>${city}</h2>
        <p>${description}</p>
        <p>Temperature: ${temp}°F</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
    `;

    weatherContainer.innerHTML = weatherHTML;

    console.log("Weather data displayed.");
}

async function loadForecast() {
    const apiKey = "86493188d381051ddea532b770ad1bf1"; 
    const city = "Tooele";
    const unit = "imperial"; 
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;

    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch forecast data");
        }

        const forecastData = await response.json();
        displayForecast(forecastData);
    } catch (error) {
        console.error("Error loading forecast:", error);
    }
}

function displayForecast(forecastData) {
    const forecastContainer = document.querySelector(".weather-forecast");
    forecastContainer.innerHTML = "";

    if (!forecastData || !forecastData.list) {
        forecastContainer.innerHTML = "<p>Unable to retrieve forecast data.</p>";
        return;
    }

    const dailyForecasts = forecastData.list.filter((entry) => entry.dt_txt.includes("12:00:00"));

    dailyForecasts.forEach((forecast) => {
        const { temp } = forecast.main;
        const { description, icon } = forecast.weather[0];
        const date = new Date(forecast.dt * 1000).toLocaleDateString();

        const forecastHTML = `
            <div class="forecast-item">
                <p>${date}</p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                <p>${description}</p>
                <p>Temp: ${temp}°F</p>
            </div>
        `;

        forecastContainer.innerHTML += forecastHTML;
    });

    console.log("Weather forecast data displayed.");
}
