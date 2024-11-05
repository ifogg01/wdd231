function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

function updateLastModified() {
    const lastModifiedDate = new Date(document.lastModified);
    document.getElementById("lastModified").textContent = formatDate(lastModifiedDate);
}

document.addEventListener("DOMContentLoaded", updateLastModified);

function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    navbar.classList.toggle('show');
    hamburger.classList.toggle('open');
}
