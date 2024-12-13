document.addEventListener("DOMContentLoaded", function () {
    addRandomVideo();
    addForm();
});

function addRandomVideo() {
    fetch('./tiktokLinks.json')
        .then(response => response.json())
        .then(data => {
            const videoURLs = data.videoURLs;

            function getRandomVideoURL() {
                const randomIndex = Math.floor(Math.random() * videoURLs.length);
                return videoURLs[randomIndex];
            }

            const randomVideoURL = getRandomVideoURL();
            const videoId = randomVideoURL.split('/')[5];

            const embedHTML = `
                <blockquote class="tiktok-embed" cite="${randomVideoURL}" data-video-id="${videoId}" style="max-width: 605px; min-width: 325px;">
                    <section> </section>
                </blockquote>
            `;

            const randomVideoDiv = document.getElementById("random-video");
            if (randomVideoDiv) {
                randomVideoDiv.innerHTML = embedHTML;
            }

            const script = document.createElement('script');
            script.src = 'https://www.tiktok.com/embed.js';
            script.async = true;
            document.body.appendChild(script);
        })
        .catch(error => console.error('Error fetching TikTok links:', error));
}

function addForm() {
    const feedbackDiv = document.getElementById("feedback");

    const formHTML = `
        <form id="contactForm" action="/my-handling-form-page" method="post">
            <div>
                <h3><label for="fname">First name: </label></h3>
                <input id="fname" name="fname" type="text" required>
                <span></span>
            </div>
            <div>
                <h3><label for="lname">Last name: </label></h3>
                <input id="lname" name="lname" type="text" required>
                <span></span>
            </div>

            <div class="emailBox">
                <h3><label for="emailAddress">Your e-mail address:</label></h3>
                <input id="emailAddress" name="email" type="email" size="80" maxlength="100" required>
                <span></span>
            </div><br>

            <div class="messageBox">
                <h3><label for="message">Comments:</label><br></h3>
                <textarea id="message" name="message" cols="50" rows="10" required placeholder="What is your message"></textarea>
            </div>

            <div class="button-box">
                <button type="submit">Submit</button>
            </div>
        </form>
    `;

    if (feedbackDiv) {
        feedbackDiv.innerHTML = formHTML;
    }

    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        const modal = document.getElementById("modal");
        const modalContent = document.querySelector(".modal-content");

        modalContent.innerHTML = `
            <span class="close-btn">&times;</span>
            <h2>Thank You, ${data.fname}!</h2>
            <p>Your message has been successfully sent. We will get back to you soon.</p>
        `;

        modal.style.display = "block";

        document.querySelector(".close-btn").addEventListener("click", () => {
            window.location.href = "thankyou.html";
        });

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                window.location.href = "thankyou.html";
            }
        });
    });
}
