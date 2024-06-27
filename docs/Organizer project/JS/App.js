// Objects for all menu features
const courseManager = new CourseManager();
const taskManager = new TaskManager();
const calendarManager = new CalendarManager();
taskManager.startLoop();

// create testing info for the course and task managers -----------------------------------------------------------------------------------------------

// addCourse(title), addAssignmentToCourse(courseId, assignmentDetails), assignment constructor "constructor(name, grade, weight)"
courseManager.addCourse('Math');
courseManager.addCourse('Science');

courseManager.selectCourse(0);

console.log("sht");
console.log(courseManager.courses);

courseManager.addAssignmentToCourse(0, new Assignment('Math Assignment 1', 90, 10, true));
courseManager.addAssignmentToCourse(0, new Assignment('Math Assignment 2', 80, 20, true));
courseManager.addAssignmentToCourse(0, new Assignment('Math Assignment 3', 70, 30, true));
courseManager.addAssignmentToCourse(0, new Assignment('Math Assignment 4', 60, 40, false));
courseManager.addAssignmentToCourse(0, new Assignment('Math Assignment 5', 50, 50, false));

courseManager.addAssignmentToCourse(1, new Assignment('Science Assignment 1', 90, 10, true));
courseManager.addAssignmentToCourse(1, new Assignment('Science Assignment 2', 80, 20, true));
courseManager.addAssignmentToCourse(1, new Assignment('Science Assignment 3', 70, 30, false));
courseManager.addAssignmentToCourse(1, new Assignment('Science Assignment 4', 60, 40, false));
courseManager.addAssignmentToCourse(1, new Assignment('Science Assignment 5', 50, 50, false));
// create demo input for task manager, AddTask (taskname, taskGrade, taskWeight, taskCourse, taskDueDate)
taskManager.AddTask('Task 1', 90, 10, 'Math', '2024-12-01');
taskManager.AddTask('Task 2', 80, 20, 'Math', '2024-12-02');
taskManager.AddTask('Task 3', 70, 30, 'Math', '2024-12-03');
taskManager.AddTask('Task 4', 60, 40, 'Math', '2024-12-04');
taskManager.AddTask('Task 5', 50, 50, 'Math', '2024-12-05');

console.log(courseManager.courses);

courseManager.display();
courseManager.displayAssignments(0);

// EVENT LISTENERS -----------------------------------------------------------------------------------------------

// Add Task Button
const taskButton = document.getElementById('tasks-btn');
taskButton.addEventListener('click', () => {
    clearHighlight();
    taskButton.classList.add('highlight');
    taskManager.display();
});

// Add grades button, displays courses when clicked
const gradesButton = document.getElementById('grades-btn');
gradesButton.classList.add('highlight');
gradesButton.addEventListener('click', () => {
    clearHighlight();
    gradesButton.classList.add('highlight');
    courseManager.display();
    courseManager.displayAssignments(courseManager.selectedCourse.id)
});

// Add calendar button, displays courses when clicked
const calendarButton = document.getElementById('calendar-btn');
calendarButton.addEventListener('click', () => {
    clearHighlight();
    calendarButton.classList.add('highlight');
    calendarManager.display();
});

// Add Course Button
document.getElementById('add-course-popup-btn').addEventListener('click', courseManager.addCourseFromPopup);

// Close Course Popup
document.getElementById('close').addEventListener('click', courseManager.closeAddCoursePopup);

// Close Assignment Popup
document.getElementsByClassName('close-popup')[0].addEventListener('click', courseManager.closeAddAssignmentPopup);

document.getElementById('add-assignment-popup-btn').addEventListener('click', () => {
    courseManager.addAssignmentFromPopup();
});

function clearHighlight () {
    //get calendar, grades and tasks button and remove the highlight class.
    const calendarButton = document.getElementById('calendar-btn');
    const gradesButton = document.getElementById('grades-btn');
    const taskButton = document.getElementById('tasks-btn');

    calendarButton.classList.remove('highlight');
    gradesButton.classList.remove('highlight');
    taskButton.classList.remove('highlight');
}

function showOverlay() {
    var overlay = document.querySelector('.overlay');
    overlay.style.display = 'block';
}

function hideOverlay() {
    var overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';
}

function updateOverallGradeDisplay() {
    
    const selectedCourseId = courseManager.selectedCourse.id;
    const course = courseManager.getCourseById(selectedCourseId);
    
    if (course) {
        course.recalculateCourseGrade();
        const courseGradeElement = document.getElementById('course-grade'+course.id);
        courseGradeElement.textContent = `Grade: ${course.overallGrade.toFixed(2)}%`;
        // make the ext white
        courseGradeElement.style.color = 'white';
        console.log(`Course grade recalculated and displayed: ${course.overallGrade.toFixed(2)}%`);
    }

    const overallGrade = courseManager.calculateOverallGrade();
    console.log(`Overall grade recalculated: ${overallGrade.toFixed(2)}%`);

    const overallGradeElements = document.querySelectorAll('#overall-grade');
    overallGradeElements.forEach(element => {
        element.textContent = `Overall Grade: ${overallGrade.toFixed(2)}%`;
    });
    console.log(`Overall grade recalculated and displayed: ${overallGrade.toFixed(2)}%`);
}

function toggleComplete (assignment, completionButton) {
    // toggles the completion based on the current state of assignment.completed
    assignment.completed = !assignment.completed;
    // toggles the style based on the current state of assignment.completed between .completed and .incomplete
    if (assignment.completed) {
        completionButton.classList.remove('incomplete');
        completionButton.classList.add('complete');
        completionButton.textContent = "Done ✔";
        completionButton.style.color = 'white';
    } else {
        completionButton.classList.remove('complete');
        completionButton.classList.add('incomplete');
        completionButton.textContent = "To Do ✘";
        completionButton.style.color = 'black';
    }
}

function removeAssignmentFromCourse(courseId, assignmentId) {
    const course = courseManager.getCourseById(courseId);
    if (course && course.assignments) {
        console.log(`Removing assignment with ID ${assignmentId} from course with ID ${courseId} 111111111111111111111`);
        courseManager.removeAssignmentFromCourse(courseId, assignmentId);
        console.log(`Assignment with ID ${assignmentId} removed from course with ID ${courseId}`);
        courseManager.displayAssignments(courseId);
    }
}

