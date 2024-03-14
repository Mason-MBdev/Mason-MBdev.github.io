document.addEventListener('DOMContentLoaded', function() {
    var project1 = document.getElementById('project_container1');
    var project2 = document.getElementById('project_container2');
    var project3 = document.getElementById('project_container3');
    
    // adds event lister to the project container so when it is clicked, it will expand and show more detail
    // Languauges used, time of completion, photos of the application/program, things learned, etc
    if (project1) {
        project1.addEventListener('click', function() {
            alert('Feature in progress, check back later');
        });
    }

    if (project2) {
        project2.addEventListener('click', function() {
            alert('Feature in progress, check back later');
        });
    }

    if (project3) {
        project3.addEventListener('click', function() {
            alert('Feature in progress, check back later');
        });
    }

});