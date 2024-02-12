// Define a function to handle form submission response
function handleFormResponse(response) {
    // Get the status message element
    const statusMessage = document.getElementById('statusMessage');

    // Check if response contains a success message
    if (response.message === "Form submitted successfully!") {
        // Update status message to indicate success
        statusMessage.innerText = 'Form submitted successfully!';
        statusMessage.style.color = 'green'; // Set color to green for success
    } else {
        // Update status message to indicate failure
        statusMessage.innerText = 'Error: Form submission failed';
        statusMessage.style.color = 'red'; // Set color to red for error
    }
}

// Get form data
const formData = new FormData();
formData.append('Name', 'Test');
formData.append('Email', 'test@example.com');
formData.append('message', 'Test message');

// Send a POST request to the server endpoint
fetch('https://pi.mbdev.ca/submit_form', {
    method: 'POST',
    body: formData
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON from the response body
})
.then(handleFormResponse) // Call the handleFormResponse function with the parsed JSON data
.catch(error => {
    // Handle any errors that occur during the fetch operation
    console.error('Error:', error);
});
