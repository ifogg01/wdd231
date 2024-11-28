function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}


function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}


document.addEventListener('DOMContentLoaded', () => {
   
    const form = document.getElementById('membership-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                organization: document.getElementById('organization').value,
                submissionDate: new Date().toLocaleString() 
            };
          
            localStorage.setItem('formData', JSON.stringify(formData));
            window.location.href = 'thankyou.html';
        });
    }

    if (window.location.pathname.includes('thankyou.html')) {
        const formData = JSON.parse(localStorage.getItem('formData'));

        if (formData) {
            document.getElementById('first-name').textContent = formData.firstName;
            document.getElementById('last-name').textContent = formData.lastName;
            document.getElementById('email').textContent = formData.email;
            document.getElementById('phone').textContent = formData.phone;
            document.getElementById('organization').textContent = formData.organization;
            document.getElementById('submission-date').textContent = formData.submissionDate;

            localStorage.removeItem('formData');
        } else {
            const container = document.querySelector('.thankyoucontainer');
            if (container) {
                container.innerHTML = '<p>Error: No data found. Please submit the form again.</p>';
            }
        }
    }
});
