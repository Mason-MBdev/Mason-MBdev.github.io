document.addEventListener('DOMContentLoaded', function() {    
    const accordion = document.getElementsByClassName('project_container');

    // adds event lister to the project containers so when it is clicked, it will expand and show more detail
    // Languauges used, time of completion, photos of the application/program, things learned, etc
    for (i = 0; i < accordion.length ; i++) {
        accordion[i].addEventListener('click', function() {
            this.classList.toggle('active')
        })
    }

    // Get the non-mobile navbar element
    const navbar = document.querySelector('nav');

    // Get the offset position of the non-mobile navbar
    const sticky = navbar.offsetTop;

    // Get the height of the non-mobile navbar
    const navbarHeight = navbar.offsetHeight;

    // Create a placeholder element to occupy the space previously taken by the non-mobile navbar
    const placeholder = document.createElement('div');
    placeholder.style.height = navbarHeight + 'px';
    placeholder.style.display = 'none'; // Initially hide the placeholder

    // Insert the placeholder before the navbar element
    navbar.parentNode.insertBefore(placeholder, navbar);

    // Add the sticky class to the non-mobile navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function stickyNavbar() {
        if (window.scrollY >= sticky) {
            navbar.classList.add("sticky");
            placeholder.style.display = 'block'; // Show the placeholder to occupy the space previously taken by the navbar
        } else {
            navbar.classList.remove("sticky");
            placeholder.style.display = 'none'; // Hide the placeholder when the navbar is not sticky
        }
    }

    // When the user scrolls the page, execute stickyNavbar for non-mobile navbar
    window.addEventListener('scroll', stickyNavbar);

    // Get the mobile navbar element
    const navbarMobile = document.querySelector('nav-mobile');

    // Get the offset position of the mobile navbar
    const stickyMobile = navbarMobile.offsetTop;

    // Get the height of the mobile navbar
    const navbarMobileHeight = navbarMobile.offsetHeight;

    // Create a placeholder element to occupy the space previously taken by the mobile navbar
    const placeholderMobile = document.createElement('div');
    placeholderMobile.style.height = navbarMobileHeight + 'px';
    placeholderMobile.style.display = 'none'; // Initially hide the placeholder

    // Insert the placeholder before the navbarMobile element
    navbarMobile.parentNode.insertBefore(placeholderMobile, navbarMobile);

    // Add the sticky class to the mobile navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function stickyNavbarMobile() {
        if (window.scrollY >= stickyMobile) {
            navbarMobile.classList.add("sticky");
            placeholderMobile.style.display = 'block'; // Show the placeholder to occupy the space previously taken by the navbar
        } else {
            navbarMobile.classList.remove("sticky");
            placeholderMobile.style.display = 'none'; // Hide the placeholder when the navbar is not sticky
        }
    }

    // When the user scrolls the page, execute stickyNavbarMobile for mobile navbar
    window.addEventListener('scroll', stickyNavbarMobile);
})