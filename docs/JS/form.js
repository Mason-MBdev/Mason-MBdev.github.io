document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submissionButton = document.getElementsByClassName('submit');
    const btn = submissionButton[0] || submissionButton;

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
            
            if (btn) {
                const originalColor = btn.style.color || '';
                if (btn.__sentTimeoutId) {
                    clearTimeout(btn.__sentTimeoutId);
                }

                if (btn.tagName === 'INPUT') {
                    btn.value = "Sent!";
                    btn.style.color = "green";
                } else {
                    btn.textContent = "Sent!";
                    btn.style.color = "green";
                }

                // random duration between 5 and 10 seconds
                const timeoutMs = (5000);
                btn.__sentTimeoutId = setTimeout(() => {
                    if (btn.tagName === 'INPUT') {
                        btn.value = "Send";
                    } else {
                        btn.textContent = "Send";
                    }
                    // restore original inline color
                    btn.style.color = originalColor;
                    btn.__sentTimeoutId = null;
                }, timeoutMs);
            }
        } catch (error) {
            console.error("Form submission error: ", error);
            if (btn) {
                if (btn.tagName === 'INPUT') {
                    btn.value = "Not sent!";
                } else {
                    btn.textContent = "Not sent!";
                }
            }
        }
    }

    // form event listener
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (btn) {
            if (btn.tagName === 'INPUT') {
                btn.value = "Sending...";
            } else {
                btn.textContent = "Sending...";
            }
        }
    
        const formData = new FormData(contactForm);

        console.log(formData);
        submitForm(formData);
    });
});
