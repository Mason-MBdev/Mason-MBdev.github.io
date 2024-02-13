document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');
    
    if (!contactForm || !statusMessage) {
        console.error('Error: Contact form or status message element not found.');
        return;
    }
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
    
        // Create a FormData object from the form
        const formData = new FormData(contactForm);
    
        // Send a POST request to the backend
        fetch('https://pi.mbdev.ca/submit_form:8443', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Update status message based on response
            return response.json(); // Parse JSON response
        })
        .then(data => {
            // Update status message based on response data
            statusMessage.innerText = data.message;
            statusMessage.style.color = 'green'; // Set color to green for success
        })
        .catch(error => {
            // Update status message based on error
            statusMessage.innerText = 'Connection closed: not recieving messages currently';
            statusMessage.style.color = 'red'; // Set color to red for error
            console.error('Error:', error);
        });
    });
});
