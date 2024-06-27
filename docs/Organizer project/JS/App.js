// Objects for all menu features
const courseManager = new CourseManager();
const taskManager = new TaskManager();
const calendarManager = new CalendarManager();
taskManager.startLoop();

// create testing info for the course and task managers -----------------------------------------------------------------------------------------------

// addCourse(title), addAssignmentToCourse(courseId, assignmentDetails), assignment constructor "constructor(name, grade, weight)"
courseManager.addCourse('Math');
courseManager.addCourse('Science');
courseManager.addCourse('English');
courseManager.addCourse('History');

courseManager.selectCourse(0);

console.log("sht");
console.log(courseManager.courses);

// Adding Math assignments
courseManager.addAssignmentToCourse(0, new Assignment('Algebra Basics', 85, 15, true));
courseManager.addAssignmentToCourse(0, new Assignment('Geometry Principles', 95, 25, true));
courseManager.addAssignmentToCourse(0, new Assignment('Calculus Introduction', 88, 35, false));
courseManager.addAssignmentToCourse(0, new Assignment('Statistics Fundamentals', 92, 45, false));

// Adding Science assignments
courseManager.addAssignmentToCourse(1, new Assignment('Biology Cell Structure', 78, 20, true));
courseManager.addAssignmentToCourse(1, new Assignment('Chemistry Periodic Table', 82, 30, true));
courseManager.addAssignmentToCourse(1, new Assignment('Physics Motion Laws', 76, 40, false));
courseManager.addAssignmentToCourse(1, new Assignment('Astronomy Solar System', 89, 50, true));

// Adding English assignments
courseManager.addAssignmentToCourse(2, new Assignment('Literature Analysis', 93, 30, true));
courseManager.addAssignmentToCourse(2, new Assignment('Creative Writing', 87, 35, true));
courseManager.addAssignmentToCourse(2, new Assignment('Grammar Exercises', 91, 40, false));
courseManager.addAssignmentToCourse(2, new Assignment('Poetry Appreciation', 86, 45, false));

// Adding History assignments
courseManager.addAssignmentToCourse(3, new Assignment('World War II Overview', 79, 25, true));
courseManager.addAssignmentToCourse(3, new Assignment('Renaissance Art', 83, 35, true));
courseManager.addAssignmentToCourse(3, new Assignment('American Revolution', 77, 40, true));
courseManager.addAssignmentToCourse(3, new Assignment('Industrial Revolution Impact', 81, 50, true));

// create demo input for task manager, AddTask (taskname, taskGrade, taskWeight, taskCourse, taskDueDate)
// Academic tasks
taskManager.AddTask('Study for Algebra Exam', 100, 20, 'Math', '2024-09-15');
taskManager.AddTask('Research Paper on Photosynthesis', 80, 30, 'Science', '2024-10-20');
taskManager.AddTask('English Essay Draft', 90, 40, 'English', '2024-11-10');
taskManager.AddTask('History Project Presentation', 85, 50, 'History', '2024-12-05');

// Personal development tasks
taskManager.AddTask('Learn Python Basics', 70, 10, 'Personal Development', '2024-08-01');
taskManager.AddTask('Start a Blog', 75, 15, 'Personal Development', '2024-09-01');
taskManager.AddTask('Complete Online Course on Digital Marketing', 80, 20, 'Personal Development', '2024-10-01');
taskManager.AddTask('Volunteer at Local Community Center', 90, 25, 'Personal Development', '2024-11-01');


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

