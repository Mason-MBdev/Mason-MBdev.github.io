document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');
    
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
            statusMessage.style.color = 'green'; // green for success
        })
        .catch(error => {
            // Update status message 
            statusMessage.innerText = 'Connection closed: I am away';
            statusMessage.style.color = 'red'; // red for error
            console.error('Error:', error);
        });
    });
});
