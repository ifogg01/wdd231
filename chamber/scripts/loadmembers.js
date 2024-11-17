document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");

    navToggle.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
        navToggle.classList.toggle("open");
    });

    // Load business data and display it
    fetch('members.json')
        .then(response => response.json())
        .then(data => {
            const businessDirectory = document.getElementById('business-directory');
            data.forEach(business => {
                const businessCard = document.createElement('div');
                businessCard.classList.add('business-card');

                businessCard.innerHTML = `
                    <img src="images/${business.image}" alt="${business.name}">
                    <h3>${business.name}</h3>
                    <p>${business.description}</p>
                    <p><strong>Address:</strong> ${business.address}</p>
                    <p><strong>Phone:</strong> ${business.phone}</p>
                    <p><a href="${business.website}" target="_blank">${business.website}</a></p>
                    <p><strong>Hours:</strong> ${business.hours}</p>
                `;

                businessDirectory.appendChild(businessCard);
            });
        })
        .catch(error => console.error('Error loading business data:', error));
});
