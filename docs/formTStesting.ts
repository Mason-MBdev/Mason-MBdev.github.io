document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm') as HTMLFormElement;
    const statusMessage = document.getElementById('statusMessage') as HTMLElement;
    const statusDot = document.getElementById('statusDot') as HTMLElement;

    if (!contactForm || !statusMessage || !statusDot) {
        console.error('Error: Contact form, status message, or status dot element not found.');
        return;
    }

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            // Create a FormData object from the form
            const formData = new FormData(contactForm);

            // Send a POST request to the backend
            const response = await fetch('https://pi.mbdev.ca/submit_form', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error: Network response was not ok');
            }

            // Parse JSON response
            const data = await response.json();

            // Update status message 
            statusMessage.innerText = data.message;
            statusMessage.style.color = 'rgb(70, 255, 130)'; // green for success
            statusDot.style.color = 'rgb(70, 255, 130)';
        } catch (error) {
            // Update status message 
            statusMessage.innerText = 'Connection closed: server is temporarily offline';
            statusMessage.style.color = 'rgb(255, 50, 50)'; // red for error
            statusDot.style.color = 'rgb(255, 50, 50)';
            console.error('Error:', error);
        }
    });
});