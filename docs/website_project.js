document.addEventListener('DOMContentLoaded', function() {
    var project1 = document.getElementById('project_container1');
    var project2 = document.getElementById('project_container2');
    var project3 = document.getElementById('project_container3');
    
    
    if (project1) {
        project1.addEventListener('click', function() {
            alert('Feature in progress');
        });
    }

    if (project2) {
        project2.addEventListener('click', function() {
            alert('Feature in progress');
        });
    }

    if (project3) {
        project3.addEventListener('click', function() {
            alert('Feature in progress');
        });
    }

});