document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');
    const serverStatusElement = document.getElementById('serverState');

    if (!contactForm || !statusMessage || !serverStatusElement) {
        console.error('Error: Contact form or status message element not found.');
        return;
    }

    console.log('Form script loaded, getting server status...');
    // Check server status
    fetch('https://pi.mbdev.ca/status')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network Error');
        }
        console.log('Server status:', response.status);
    })
    .then(data => {
        serverStatusElement.innerText = 'Online';
        serverStatusElement.style.color = 'rgb(70, 255, 130)'; // green for success
    })
    .catch(error => {
        serverStatusElement.innerText = 'Offline';
        serverStatusElement.style.color = 'rgb(255, 50, 50)'; // red for error
        console.error('Error:', error);
    });
    console.log('Server status checked. Returned:', serverStatusElement.innerText);

    // Route for form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        // Create a FormData object from the form
        const formData = new FormData(contactForm);

        console.log(formData);

        // Send a POST request to the backend
        fetch('https://pi.mbdev.ca/submit_form', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network Error');
            }
            // Update status message 
            return response.json(); // Parse JSON response
        })
        .then(data => {
            // Update status message 
            statusMessage.innerText = data.message;
            statusMessage.style.color = 'rgb(70, 255, 130)'; // green for success

        })
        .catch(error => {
            // Update status message 
            statusMessage.innerText = 'Not sent';
            statusMessage.style.color = 'rgb(255, 50, 50)'; // red for error
            console.error('Error:', error);
        });
    });
});
