document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");

    navToggle.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
        navToggle.classList.toggle("open");
    });

    document.addEventListener("click", function (event) {
        if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
            nav.classList.remove("nav-open");
            navToggle.classList.remove("open");
        }
    });
    displayLastVisitMessage(); 
    loadMembers();
    loadSpotlight();
    updateLastModified();
    loadWeather();
    loadForecast();
    setupViewToggle();
    });

function displayLastVisitMessage() {
    const messageContainer = document.querySelector(".visit-message");

    if (!messageContainer) {
        console.error("Visit message container not found in the DOM.");
        return;
    }

    const now = new Date();
    const lastVisit = localStorage.getItem("lastVisit");
    let message = "";

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(lastVisit);
        const timeDifference = now - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference < 1) {
            message = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${daysDifference} days ago.`;
        }
    }

    messageContainer.textContent = message; 

    localStorage.setItem("lastVisit", now.toISOString());
    console.log("Visitor message displayed:", message);
}



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
async function loadSpotlight() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error("Failed to fetch members data");
        }

        const members = await response.json();
        displaySpotlight(members);
    } catch (error) {
        console.error("Error loading spotlight members:", error);
    }
}

function displaySpotlight(members) {
    const spotlightSection = document.querySelector("#spotlight-cards");
    spotlightSection.innerHTML = "";

    if (!members || members.length === 0) {
        spotlightSection.innerHTML = "<p>No spotlight members available to display.</p>";
        return;
    }

    const shuffledMembers = members.sort(() => 0.5 - Math.random());
    const spotlightMembers = shuffledMembers.slice(0, 3);

    spotlightMembers.forEach((member) => {
        const spotlightCard = document.createElement("div");
        spotlightCard.classList.add("spotlight-card");

        spotlightCard.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h2>${member.name}</h2>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${member.membership_level}</p>
        `;

        spotlightSection.appendChild(spotlightCard);
    });

    console.log("Spotlight members displayed.");
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
