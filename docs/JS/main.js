document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('professional-btn').addEventListener('click', showProfessional);
    document.getElementById('professional-btn').classList.add('active');
    document.getElementById('personal-btn').addEventListener('click', showPersonal);

    function showProfessional(event) {
        event.preventDefault();
        const aboutMeText = document.getElementById('about-me-text');
        aboutMeText.innerHTML = `
            <p>Hi, I'm Mason, a student in Waterloo, Ontario. </p>
            <p>Professionally interested in <span class="highlight">Full-stack development</span>, <span class="highlight">Systems design</span>, <span class="highlight">Automation</span>, and <span class="highlight">Algorithms</span>.</p>
        `;
        document.getElementById('professional-btn').classList.add('active');
        document.getElementById('personal-btn').classList.remove('active');
    }

    function showPersonal() {
        console.log("Fuc");
        const aboutMeText = document.getElementById('about-me-text');
        aboutMeText.innerHTML = `
            <p>Hi, I'm Mason, a student in Waterloo, Ontario. </p>
            <p>Personally interested in <span class="highlight">Chess</span>, <span class="highlight">Astronomy</span>, and <span class="highlight">Cars</span>. </p>
        `;
        document.getElementById('personal-btn').classList.add('active');
        document.getElementById('professional-btn').classList.remove('active');
    }
});