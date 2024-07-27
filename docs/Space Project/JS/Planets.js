const planets = [
    { name: 'Mercury', distanceAU: 0.39, orbitalPeriod: 88, meanAnomaly: 0, size: 1.7, image: './images/question2.png', description: "I haven't taken a picture of this one yet!", origin: '', myphotos: [] },
    { name: 'Venus', distanceAU: 0.72, orbitalPeriod: 225, meanAnomaly: 50, size: 1.5, image: './images/question2.png', description: "I haven't taken a picture of this one yet!", origin: '', myphotos: [] },
    { name: 'Earth', distanceAU: 1.00, orbitalPeriod: 365.25, meanAnomaly: 100, size: 2.3, image: './images/earth.png', description: "It's hard to take a photo of the planet you are standing on . . .", origin: 'NASA', moons: [{name: 'Moon', distanceAU: 0.2, orbitalPeriod: 27.32, meanAnomaly: 0, size: 1, image: './images/moon.png', description: '', origin: 'NASA', myphotos: [] }], myphotos: ['./images/moon.png'] },
    { name: 'Mars', distanceAU: 1.52, orbitalPeriod: 687, meanAnomaly: 150, size: 2, image: './images/mars.png', description: '', origin: 'NASA', myphotos: [] },
    { name: 'Jupiter', distanceAU: 5.20, orbitalPeriod: 4333, meanAnomaly: 200, size: 4, image: './images/jupiter.png', description: '', origin: 'NASA', myphotos: [] },
    { name: 'Saturn', distanceAU: 9.58, orbitalPeriod: 10759, meanAnomaly: 250, size: 3, image: './images/saturn.png', description: '', origin: 'NASA', myphotos: [] },
    { name: 'Uranus', distanceAU: 19.22, orbitalPeriod: 30687, meanAnomaly: 300, size: 2.5, image: './images/question2.png', description: "I haven't taken a picture of this one yet!", origin: '', myphotos: [] },
    { name: 'Neptune', distanceAU: 30.05, orbitalPeriod: 60190, meanAnomaly: 350, size: 3, image: './images/question2.png', description: "I haven't taken a picture of this one yet!", origin: '', myphotos: [] },
    { name: 'Pluto', distanceAU: 39.48, orbitalPeriod: 90560, meanAnomaly: 400, size: 1.5, image: './images/question2.png', description: "I haven't taken a picture of this one yet!", origin: '', myphotos: [] },
];

let scale = 225; // Initial scale factor
const minScale = 9; // Minimum scale factor (based on the smallest orbit)
const maxScale = 500; // Maximum scale factor (based on the largest orbit)

let isDragging = false;
let startX, startY;
let translateX = 0, translateY = 0;
const maxTranslateX = 1000; // Maximum panning distance
const maxTranslateY = 1000; // Maximum panning distance

function getRealTimePosition(orbitalPeriod, meanAnomaly) {
    const now = new Date();
    const currentJulianDate = (now / 86400000.0) + 2440587.5;
    const daysSinceEpoch = currentJulianDate - 2451545.0;
    const meanAnomalyCurrent = (meanAnomaly + (360 / orbitalPeriod) * daysSinceEpoch) % 360;
    return meanAnomalyCurrent;
}

function createOrbitsAndPlanets() {
    const container = document.getElementById('solarSystemContainer');
    container.innerHTML = ''; // Clear existing elements

    // Add Sun
    const sun = document.createElement('div');
    sun.id = 'sun';
    container.appendChild(sun);

    planets.forEach(planet => {
        const orbitRadius = planet.distanceAU * scale;

        // Create orbit
        const orbit = document.createElement('div');
        orbit.className = 'orbit';
        orbit.style.width = `${orbitRadius * 2}px`;
        orbit.style.height = `${orbitRadius * 2}px`;
        orbit.dataset.planet = planet.name; // Set data attribute for hover effect
        container.appendChild(orbit);

        // Create planet
        const planetElement = document.createElement('img');
        planetElement.className = 'planet';
        planetElement.src = planet.image;
        planetElement.alt = planet.name;
        planetElement.style.width = `${planet.size * 10}px`; // Scale planet size semi-realistically
        planetElement.style.height = `${planet.size * 10}px`; // Scale planet size semi-realistically

        if (planet.name === 'Saturn') {
            planetElement.style.width = `${planet.size * 10 * 2}px`; // Modify width for Saturn
        }
        planetElement.dataset.planet = planet.name; // Set data attribute for hover effect

        // Add click event listener to planet
        planetElement.addEventListener('click', () => {
            scrollToAccordion(planet.name);
        });

        const degree = getRealTimePosition(planet.orbitalPeriod, planet.meanAnomaly);
        const angle = degree * Math.PI / 180;
        const x = orbitRadius * Math.cos(angle);
        const y = orbitRadius * Math.sin(angle);
        planetElement.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        container.appendChild(planetElement);

        // Create moons if any
        if (planet.moons) {
            planet.moons.forEach(moon => {
                const moonOrbitRadius = moon.distanceAU * scale;

                // Create moon orbit
                const moonOrbit = document.createElement('div');
                moonOrbit.className = 'moon-orbit';
                moonOrbit.style.width = `${moonOrbitRadius * 2}px`;
                moonOrbit.style.height = `${moonOrbitRadius * 2}px`;
                moonOrbit.dataset.planet = moon.name; // Set data attribute for hover effect
                moonOrbit.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`; // Center moon orbit on the planet
                container.appendChild(moonOrbit);

                // Create moon
                const moonElement = document.createElement('img');
                moonElement.className = 'moon';
                moonElement.src = './images/moon.png';
                moonElement.alt = moon.name;
                moonElement.style.width = `${moon.size * 10}px`;
                moonElement.style.height = `${moon.size * 10}px`;

                // Position the moon relative to the planet
                const moonDegree = getRealTimePosition(moon.orbitalPeriod, moon.meanAnomaly);
                const moonAngle = moonDegree * Math.PI / 180;
                const moonX = moonOrbitRadius * Math.cos(moonAngle);
                const moonY = moonOrbitRadius * Math.sin(moonAngle);
                moonElement.style.transform = `translate(${x + moonX}px, ${y + moonY}px) translate(-50%, -50%)`;
                container.appendChild(moonElement);
            });
        }
    });
}

function setupZoomAndPan() {
    const container = document.getElementById('container-solarsim');
    const content = document.getElementById('solarSystemContainer');

    container.addEventListener('wheel', event => {
        event.preventDefault();
        if (event.deltaY > 0) {
            scale = Math.max(minScale, scale * 0.9);
        } else {
            scale = Math.min(maxScale, scale * 1.1);
        }
        createOrbitsAndPlanets(); // Redraw orbits and planets
    });

    container.addEventListener('mousedown', event => {
        isDragging = true;
        startX = event.clientX - translateX;
        startY = event.clientY - translateY;
    });

    container.addEventListener('mousemove', event => {
        if (isDragging) {
            translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, event.clientX - startX));
            translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, event.clientY - startY));
            content.style.transform = `translate(${translateX}px, ${translateY}px)`;
        }
    });

    container.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('mouseleave', () => {
        isDragging = false;
    });
}


function createAccordion() {
    const accordionMenu = document.querySelector('.accordion-menu');
    const planetsWithPhotos = planets.filter(planet => planet.myphotos.length > 0);
    const planetsWithoutPhotos = planets.filter(planet => planet.myphotos.length === 0);

    const sectionWithPhotos = document.createElement('section');
    const sectionWithoutPhotos = document.createElement('section');

    const headerWithPhotos = document.createElement('h2');
    headerWithPhotos.textContent = 'Planets with Photos';
    headerWithPhotos.style.marginBottom = '15px';
    sectionWithPhotos.appendChild(headerWithPhotos);

    const headerWithoutPhotos = document.createElement('h2');
    headerWithoutPhotos.textContent = 'Planets without Photos';
    headerWithoutPhotos.style.marginBottom = '15px';
    sectionWithoutPhotos.appendChild(headerWithoutPhotos);

    planetsWithPhotos.forEach(planet => {
        const item = createAccordionItem(planet);
        sectionWithPhotos.appendChild(item);
    });

    planetsWithoutPhotos.forEach(planet => {
        const item = createAccordionItem(planet);
        sectionWithoutPhotos.appendChild(item);
    });

    accordionMenu.appendChild(sectionWithPhotos);
    accordionMenu.appendChild(sectionWithoutPhotos);
}

function createAccordionItem(planet) {
    const item = document.createElement('li');
    item.className = 'accordion-item';

    const header = document.createElement('div');
    header.className = 'accordion-header';
    header.textContent = planet.name;
    if (planet.myphotos.length > 0) {
        header.classList.add('graphed');
    }
    item.appendChild(header);

    const content = document.createElement('div');
    content.className = 'accordion-content';
    content.innerHTML = `
        ${planet.myphotos.length > 0 ? `<h3 style="text-align: center; margin-bottom: 15px;">My photos:</h3>
        <div class="photos" style="display: flex; justify-content: center;">
        ${planet.myphotos.map(photo => `<img src="${photo}" alt="${planet.name} photo" style="margin: 0 5px;">`).join('')}
        </div>` : `<img src="./images/question2.png" alt="Question Image" style="display: block; margin: 0 auto;">`}
        <p style="text-align: center;">${planet.description}<br></p>
    `;
    item.appendChild(content);

    header.addEventListener('click', () => {
        toggleAccordion(item);
    });

    return item;
}

function toggleAccordion(item) {
    const content = item.querySelector('.accordion-content');
    const isOpen = content.classList.contains('open');

    document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
    document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));

    if (!isOpen) {
        content.classList.add('open');
        item.querySelector('.accordion-header').classList.add('active');
    }
}

function scrollToAccordion(planetName) {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        if (header.textContent === planetName) {
            header.scrollIntoView({ behavior: 'smooth' });
            toggleAccordion(header);
        }
    });
}

createOrbitsAndPlanets();
createAccordion();
setupZoomAndPan();
