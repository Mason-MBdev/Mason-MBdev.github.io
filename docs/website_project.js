document.addEventListener('DOMContentLoaded', function() {    
    const accordion = document.getElementsByClassName('project_container');

    // adds event lister to the project containers so when it is clicked, it will expand and show more detail
    // Languauges used, time of completion, photos of the application/program, things learned, etc
    for (i = 0; i < accordion.length ; i++) {
        accordion[i].addEventListener('click', function() {
        this.classList.toggle('active')
    })
    }
})