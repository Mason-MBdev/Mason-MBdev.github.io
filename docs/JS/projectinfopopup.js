const projectData = {
    portfoliowebsite: {
        title: "Personal Website",
        features: ["- Responsive & Interactive site for display", "- Hardware integration for the contact form"],
        languages: ["Python", "JavaScript", "NGinx", "Raspberry Pi"],
        images: [
            "./Content/FinalChart.drawio.svg",
            "./Content/Raspberry-Pi-LCD-4-bit-mode.png"
        ],
        currentImageIndex: 0,
        link: "https://mbdev.ca/"
    },
    onlinechess: {
        title: "Web Chess",
        features: ["- Another chess website to play on during lectures", "- Working on online multiplayer now"],
        languages: [ "JavaScript", "Node.js", "Socket.io"],
        images: [
            "./Content/chess-board.png",
            "./Content/chess-popup.png"
        ],
        currentImageIndex: 0,
        link: "./Chess project/chess_index.html"
    },
    academicorganizer: {
        title: "Academic Organizer",
        features: ["- Management for grades and tasks", "- Cloud save & Account login"],
        languages: ["JavaScript", "Firebase Authentication", "Firebase Firestore"],
        images: [
            "./Content/sign-in-element.png",
            "./Content/gradetracker-homepage.png"
        ],
        currentImageIndex: 0,
        link: "./Organizer project/GradeTracker.html"
    },
    terminalmessenger: {
        title: "Typewriter",
        features: ["- Send encrypted messages", "- Transfer files safely between devices", "- Minimal command based interface"],
        languages: ["Python", "Socket Programming", "Cryptography"],
        images: [
            "./Content/typewriter.png",
        ],
        currentImageIndex: 0,
        link: "www.google.com"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    const projectContainers = document.querySelectorAll(".project_container");
    const popup = document.getElementById("project-info-popup");
    const closePopupBtn = document.getElementById("close-popup-btn");

    const popupTitle = document.getElementById("popup-title");
    const featuresList = document.getElementById("features-list");
    const languagesList = document.getElementById("languages-list");
    const popupLink = document.getElementById("popup-link");
    const carouselImage = document.getElementById("carousel-image");
    const carouselLeft = document.getElementById("carousel-left");
    const carouselRight = document.getElementById("carousel-right");

    let activeProjectId = null; // Track which project is active for carousel use

    projectContainers.forEach(container => {
        console.log(`Setting up click event for project container with id: ${container.id}`);
        container.addEventListener("click", () => {
            console.log(`Project container clicked with id: ${container.id}`);
            activeProjectId = container.id;
            const project = projectData[activeProjectId];

            if (project) {
                console.log(`Project data found for id: ${activeProjectId}`);
                popupTitle.textContent = project.title;
                featuresList.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join("");
                languagesList.innerHTML = project.languages.map(lang => `<li>${lang}</li>`).join("");

                // Display the first image in the carousel
                project.currentImageIndex = 0;
                if (project.images && project.images.length > 0) {
                    carouselImage.src = project.images[project.currentImageIndex];
                    carouselLeft.style.display = "block";
                    carouselRight.style.display = "block";
                } else {
                    carouselImage.src = ""; // Hide image if none are defined
                    carouselLeft.style.display = "none";
                    carouselRight.style.display = "none";
                }

                popup.classList.remove("hidden");
                console.log("Popup displayed, class list:", popup.classList); // Debug statement
            } else {
                console.error(`No project data found for id: ${activeProjectId}`);
            }
        });
    });

    // Close popup - button
    closePopupBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
        console.log("Popup hidden after close button click, class list:", popup.classList); // Debug statement
    });

    // Close popup - clicking outside of window
    window.addEventListener("click", event => {
        if (event.target === popup) {
            popup.classList.add("hidden");
            console.log("Popup hidden after outside click, class list:", popup.classList); // Debug statement
        }
    });

    // Carousel navigation
    carouselLeft.addEventListener("click", () => {
        const project = projectData[activeProjectId];
        if (project.images && project.images.length > 0) {
            project.currentImageIndex = (project.currentImageIndex - 1 + project.images.length) % project.images.length;
            carouselImage.src = project.images[project.currentImageIndex];
            console.log("Carousel left button clicked, new image index:", project.currentImageIndex);
        }
    });

    carouselRight.addEventListener("click", () => {
        const project = projectData[activeProjectId];
        if (project.images && project.images.length > 0) {
            project.currentImageIndex = (project.currentImageIndex + 1) % project.images.length;
            carouselImage.src = project.images[project.currentImageIndex];
            console.log("Carousel right button clicked, new image index:", project.currentImageIndex);
        }
    });
});
