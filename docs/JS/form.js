document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) {
        console.error('Error: Contact form element not found.');
        return;
    }

    // Check server status
    console.log('Form script loaded and form element found, checking server status...');
    fetch('https://pi.mbdev.ca/status')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network Error');
        }
        console.log('Server status: ', response.status);
    })
    .catch(error => {
        console.error('Server error: ', error);
    }); 

    // form submission handling
    async function submitForm(formData) {
        try {
            const response = await fetch("https://pi.mbdev.ca/submit_form", {
                method: "POST",
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
    
            const result = await response.json(); // Assuming JSON response
            console.log("Form submission success: ", result);
        } catch (error) {
            console.error("Form submission error: ", error);
        }
    }

    // form event listener
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        const formData = new FormData(contactForm);

        console.log(formData);
        submitForm(formData);
    });
});
