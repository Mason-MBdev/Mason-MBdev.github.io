document.addEventListener('DOMContentLoaded', function() {    
    const accordion = document.getElementsByClassName('project_container');

    // adds event lister to the project containers so when it is clicked, it will expand and show more detail
    // Languauges used, time of completion, photos of the application/program, things learned, etc
    for (i = 0; i < accordion.length ; i++) {
        accordion[i].addEventListener('click', function() {
            this.classList.toggle('active')
        })
    }

    // Sticky nav bar code
    function stickyNavbar(navbar, offset) {
        if (window.scrollY >= offset) {
            navbar.classList.add("sticky");
            document.body.style.paddingTop = navbar.offsetHeight + 'px';
        } else {
            navbar.classList.remove("sticky");
            document.body.style.paddingTop = 0;
        }
    }

    // desktop nav bar element and offset
    var navbarDesktop = document.querySelector('nav');
    var stickyDesktop = navbarDesktop.offsetTop;

    // mobile nav bar element and offset
    var navbarMobile = document.querySelector('nav-mobile');
    var stickyMobile = navbarMobile.offsetTop;

    // excecute function for correct bar
    window.addEventListener('scroll', function() {
        if (window.innerWidth >= 768) {
            stickyNavbar(navbarDesktop, stickyDesktop);
        } else {
            stickyNavbar(navbarMobile, stickyMobile);
        }
    });
})