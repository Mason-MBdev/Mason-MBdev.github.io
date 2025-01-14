# My Site

## Description

My website for hosting software/hobby projects, with a few interactive features.

## Features

- **Project Listings**: Each project has embedded videos, and links to the live site & code repositories.
- **Contact Form**: Submissions lead to a server behind an NGINX proxy, where messages are printed in real-time to a screen on my desk.
- **Responsive Design**: Mobile-friendly layout.

## Technology Used

- **HTML & CSS**: Structure and styling.
- **JavaScript**: Handles form submissions to the server via Fetch API.
- **NGINX**: Proxy server handling contact page submissions.
- **Font Awesome**: Nice icons for UI elements.

## General Browser and Web Server Interaction

1. **Contact form submission**: Data is encrypted on submission using the HTTPS protocol.
2. **DNS resolution**: DNS servers resolve the target domain to an IP address.
3. **Data transmission**: Encrypted data travels over ISP networks, routed through various links.
4. **Home router**: Data arrives at the home router and is port forwarded to the correct device.
5. **Proxy server**: Proxy performs security checks and forwards the data to the backend program.

## Future Plans

- Expand the backend to integrate new features, monitoring, and applications.