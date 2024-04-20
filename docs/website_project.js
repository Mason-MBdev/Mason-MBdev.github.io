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
    var navbar = document.querySelector('nav');

    // Get the offset position of the non-mobile navbar
    var sticky = navbar.offsetTop;

    // Add the sticky class to the non-mobile navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function stickyNavbar() {
        if (window.scrollY >= sticky) {
            navbar.classList.add("sticky");
            document.body.style.paddingTop = navbar.offsetHeight + 'px'; // Add padding to the body equal to the height of the navbar
        } else {
            navbar.classList.remove("sticky");
            document.body.style.paddingTop = 0; // Remove padding from the body when the navbar is not sticky
        }
    }

    // When the user scrolls the page, execute stickyNavbar for non-mobile navbar
    window.addEventListener('scroll', stickyNavbar);

    // Get the mobile navbar element
    var navbarMobile = document.querySelector('nav-mobile');

    // Get the offset position of the mobile navbar
    var stickyMobile = navbarMobile.offsetTop;

    // Add the sticky class to the mobile navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function stickyNavbarMobile() {
        if (window.scrollY >= stickyMobile) {
            navbarMobile.classList.add("sticky");
        } else {
            navbarMobile.classList.remove("sticky");
        }
    }

    // When the user scrolls the page, execute stickyNavbarMobile for mobile navbar
    window.addEventListener('scroll', stickyNavbarMobile);
})