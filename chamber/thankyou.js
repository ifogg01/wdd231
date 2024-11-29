document.addEventListener('DOMContentLoaded', () => {
    const formData = JSON.parse(localStorage.getItem('formData'));

    if (formData) {
        document.getElementById('first-name').textContent = formData.firstName;
        document.getElementById('last-name').textContent = formData.lastName;
        document.getElementById('email').textContent = formData.email;
        document.getElementById('phone').textContent = formData.phone;
        document.getElementById('organization').textContent = formData.organization;
        document.getElementById('membershiplevel').textContent = formData.membershiplevel;
        document.getElementById('submission-date').textContent = formData.submissionDate;

        localStorage.removeItem('formData');
    } else {
        const container = document.querySelector('.thankyoucontainer');
        if (container) {
            container.innerHTML = '<p>Error: No data found. Please submit the form again.</p>';
        }
    }
});
