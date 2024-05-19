document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');
    const statusDot = document.getElementById('statusDot');


    if (!contactForm || !statusMessage) {
        console.error('Error: Contact form or status message element not found.');
        return;
    }
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        // Create a FormData object from the form
        const formData = new FormData(contactForm);

        // Send a POST request to the backend
        fetch('https://pi.mbdev.ca/submit_form', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error: Network response was not ok');
            }
            // Update status message 
            return response.json(); // Parse JSON response
        })
        .then(data => {
            // Update status message 
            statusMessage.innerText = data.message;
            statusMessage.style.color = 'rgb(70, 255, 130)'; // green for success
            statusDot.style.color = 'rgb(70, 255, 130)';

        })
        .catch(error => {
            // Update status message 
            statusMessage.innerText = 'Connection closed: server is temporarily offline';
            statusMessage.style.color = 'rgb(255, 50, 50)'; // red for error
            statusDot.style.color = 'rgb(255, 50, 50)';
            console.error('Error:', error);
        });
    });
});
