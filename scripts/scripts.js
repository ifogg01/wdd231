function displayCourses(filter) {
    const courseListContainer = document.querySelector('.course-list');
    const totalCreditsElement = document.getElementById('totalCredits');

    courseListContainer.innerHTML = '';

    const filteredCourses = courses.filter(course => filter === 'all' || course.subject === filter);

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;

    filteredCourses.forEach(course => {
        const courseButton = document.createElement('button');
        courseButton.classList.add('course', course.subject);

        if (course.completed) {
            courseButton.classList.add('completed');  
        } else {
            courseButton.classList.add('not-completed');  
        }

        courseButton.textContent = `${course.subject} ${course.number}: ${course.title}`;
        courseButton.title = course.description;

        courseButton.addEventListener('click', () => openCourseModal(course));

        courseListContainer.appendChild(courseButton);
    });
}

function openCourseModal(course) {
    const modal = document.getElementById('courseModal');
    const courseDetails = document.getElementById('courseDetails');

    courseDetails.innerHTML = `
        <h3>${course.subject} ${course.number}: ${course.title}</h3>
        <p><strong>Description:</strong> ${course.description}</p>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
        <p><strong>Completed:</strong> ${course.completed ? 'Yes' : 'No'}</p>
    `;

    modal.style.display = 'flex';

    const closeButton = modal.querySelector('.close');
    closeButton.onclick = () => closeModal(modal);

    window.onclick = event => {
        if (event.target === modal) closeModal(modal);
    };
}

function closeModal(modal) {
    modal.style.display = 'none';
}

function setupFilterButtons() {
    document.querySelectorAll('.filter-buttons button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-buttons button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            displayCourses(button.getAttribute('data-filter'));
        });
    });
}

function updateFooterDates() {
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;

    const copyrightElement = document.querySelector('.footer p:first-of-type');
    copyrightElement.innerHTML = `&copy; ${currentYear} Isaac Fogg - UT`;

    const lastModifiedElement = document.getElementById('lastModified');
    lastModifiedElement.textContent = lastModified;
}

function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    
    navbar.classList.toggle('show');
    hamburger.classList.toggle('open');
}

document.addEventListener("DOMContentLoaded", () => {
    displayCourses('all'); 
    setupFilterButtons();
    updateFooterDates();
});
