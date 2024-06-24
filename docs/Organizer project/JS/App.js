// Objects for all menu features
const courseManager = new CourseManager();
const taskManager = new TaskManager();
const calendarManager = new CalendarManager();
taskManager.startLoop();

function populateCourseDropdown() {
    const courseDropdowns = document.querySelectorAll('#course-dropdown');
    courseDropdowns.forEach(courseDropdown => {
        courseDropdown.innerHTML = '<option value="" disabled selected>Select or add a course to start</option>'; // Default option

        courseManager.courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.id;
            option.text = course.title;
            courseDropdown.add(option);
        });
    });
}

function updateAssignmentsDisplay(courseId) {
    console.log(`Starting updateAssignmentsDisplay for course ID: ${courseId}`);

    // Find the course object by ID
    const course = courseManager.getCourseById(courseId);
    if (!course) {
        console.error("Course not found");
        return;
    }

    console.log(`Course found, proceeding to construct selector`);

    // Construct a selector for the grades section using the data-id attribute
    const gradesSectionSelector = `.course[data-id="${courseId}"] >.grades-section`;
    console.log(`Constructed selector: ${gradesSectionSelector}`);

    // Attempt to find the grades section using the constructed selector
    const gradesSection = document.querySelector(gradesSectionSelector);
    if (!gradesSection) {
        console.error(`Grades section not found for course ID: ${courseId}`);
        return;
    }

    console.log(`Grades section found, clearing existing assignments`);

    // Clear existing assignments
    gradesSection.innerHTML = '';

    // Create the course name element
    const courseNameElement = document.createElement('h3');
    courseNameElement.textContent = course.title;
    courseNameElement.style.fontSize = '27px';
    courseNameElement.style.marginBottom = '60px';
    courseNameElement.style.textAlign = 'center'; // Add text alignment
    gradesSection.appendChild(courseNameElement);

    // menu info div container-=-------------------------------------------------------------------------------------------------------------
    let menuInfoDiv = document.createElement('div');
    menuInfoDiv.classList.add('course-menu-info');
    menuInfoDiv.style.display = 'flex'; // Format children as a row
    gradesSection.appendChild(menuInfoDiv);

    // menu info div internal container 1
    let menuInternalInfoDiv1 = document.createElement('div');
    menuInternalInfoDiv1.classList.add('menu-info-internal');
    menuInfoDiv.appendChild(menuInternalInfoDiv1);

    // Add priority task label
    let CourseInfoBox = document.createElement('h3');
    CourseInfoBox.innerText = 'Course Info Box #1';
    menuInternalInfoDiv1.appendChild(CourseInfoBox);

    // Course grade element
    let courseGradeElement = document.createElement('h4');
    courseGradeElement.id = 'course-grade'+course.id;
    courseGradeElement.textContent = "0.00%";
    // make it normal, not bold
    courseGradeElement.style.fontWeight = 'normal';
    // Set text color to white
    courseGradeElement.style.color = 'white';
    courseGradeElement.style.fontSize = '18px'; // Set font size to 21
    menuInternalInfoDiv1.appendChild(courseGradeElement);

    // Add time of that task
    let CourseInfoTwo = document.createElement('h4');
    CourseInfoTwo.innerText = 'Course Info #2 ';
    CourseInfoTwo.id = 'Course Info #2'; // Add an id to the element
    // make it normal, not bold
    CourseInfoTwo.style.fontWeight = 'normal';
    // Set text color to white
    CourseInfoTwo.style.color = 'white';
    CourseInfoTwo.style.fontSize = '18px'; // Set font size to 21
    menuInternalInfoDiv1.appendChild(CourseInfoTwo);
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // menu info div internal container 2
    let menuInternalInfoDiv2 = document.createElement('div');
    menuInternalInfoDiv2.classList.add('menu-info-internal');
    menuInfoDiv.appendChild(menuInternalInfoDiv2);

    // Add completion stats label
    let CourseInfoBoxTwo = document.createElement('h3');
    CourseInfoBoxTwo.innerText = 'Course Info Box #2';
    menuInternalInfoDiv2.appendChild(CourseInfoBoxTwo);

    // Add completed task count
    let CourseInfoThree = document.createElement('h4');
    CourseInfoThree.innerText = `Course Info #3`;
    CourseInfoThree.style.marginRight = '29px'; // Add right margin
    CourseInfoThree.style.color = 'white';
    CourseInfoThree.style.fontSize = '18px'; // Set font size to 21
    // make it normal, not bold
    CourseInfoThree.style.fontWeight = 'normal';
    menuInternalInfoDiv2.appendChild(CourseInfoThree);

    // Add incomplete task count
    let CourseInfoFour = document.createElement('h4');
    CourseInfoFour.innerText = `Course Info #4`;
    CourseInfoFour.style.marginRight = '29px'; // Add right margin
    CourseInfoFour.style.color = 'white';
    CourseInfoFour.style.fontSize = '18px'; // Set font size to 21
    // make it normal, not bold
    CourseInfoFour.style.fontWeight = 'normal';
    menuInternalInfoDiv2.appendChild(CourseInfoFour);

    // create meta task div to hold task operations and task title
    let metaTaskDiv = document.createElement('div');
    metaTaskDiv.classList.add('meta-task');
    gradesSection.appendChild(metaTaskDiv);

    // Create the legend div
    const legendDiv = document.createElement('div');
    legendDiv.className = 'legend';

    // Populate the legend div with names, grades, weighted grades, completion, and operations
    ['Assignment', 'Grade', 'Weighted Grade', 'Operations'].forEach(text => {
        const legendItem = document.createElement('div');
        const legendItemText = document.createElement('h3');
        legendItemText.style.fontSize = '19px';
        legendItemText.textContent = text;
        legendItemText.style.fontWeight = 'bold';
        legendItem.appendChild(legendItemText);
        legendDiv.appendChild(legendItem);
    });

    gradesSection.appendChild(legendDiv);

    console.log(`Existing assignments cleared, generating new assignment HTML`);

    // Generate HTML for each assignment
    course.assignments.forEach(assignment => {
        const assignmentElement = document.createElement('div');
        assignmentElement.className = 'assignment assignment-details-container';

        // Create the h3 element for the assignment name
        const nameH4 = document.createElement('h4');
        nameH4.textContent = assignment.name; // Set the text content of the h4
        nameH4.style.fontSize = '17.5px'; // Set the font size to 20px
        const nameElement = document.createElement('div');
        // Append the h3 to the div
        nameElement.appendChild(nameH4);

        // Create the h3 element for the assignment grade
        const gradeElement = document.createElement('h4');
        gradeElement.textContent = `${assignment.grade}%`;
        gradeElement.style.fontSize = '17px'; // Set the font size to 20px
        const gradeElementWrapper = document.createElement('div');
        // Append the h3 to the div
        gradeElement.style.color = 'rgb(230, 230, 230)'; // Set the text color to a darker shade of white
        gradeElementWrapper.appendChild(gradeElement);
        
        // Create the h3 element for the assignment weighted grade
        const weightedGradeElement = document.createElement('h4');
        const assignmentWeightedScore = (assignment.grade * (assignment.weight / 100)).toFixed(2);
        const weightedGradeString = (`${assignmentWeightedScore} / ${assignment.weight}%`);
        weightedGradeElement.textContent = weightedGradeString;
        weightedGradeElement.style.fontSize = '17px'; // Set the font size to 20px
        const assignmentWeightedScoreWrapper = document.createElement('div');
        // Append the h3 to the div
        weightedGradeElement.style.color = 'rgb(230, 230, 230)'; // Set the text color to a darker shade of white
        assignmentWeightedScoreWrapper.appendChild(weightedGradeElement);

        // Checkbox for marking assignment as complete or incomplete
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = assignment.completed; // Initialize with the current state
        checkbox.addEventListener('change', () => {
            assignment.completed = checkbox.checked;
            updateOverallGradeDisplay();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete \u{1F5D1}';
        deleteButton.classList.add('secondary');
        deleteButton.classList.add('assignment-operators');
        deleteButton.classList.add("ass-delete-button");

        deleteButton.onclick = () => removeAssignmentFromCourse(courseId, assignment.id); // Assuming this function handles deletion

        const completionButton = document.createElement('button');
        completionButton.classList.add('secondary');
        completionButton.classList.add('assignment-operators');
        completionButton.textContent = 'Done ✔';

        // Depending on the current state of the assignment, apply the complete and incomplete classes
        if (assignment.completed) {
            completionButton.classList.remove('incomplete');
            completionButton.classList.add('complete');
            completionButton.textContent = 'Done ✔';
            // set the text to white
            completionButton.style.color = 'white';
            
        } else {
            completionButton.classList.add('incomplete');
            completionButton.classList.remove('complete');
            completionButton.textContent = 'To Do ✘';
            completionButton.style.color = 'black';
        }

        completionButton.addEventListener('click', () => {
            toggleComplete(assignment, completionButton);
            updateOverallGradeDisplay();
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit \u{2710}';
        editButton.classList.add('secondary');
        editButton.classList.add('assignment-operators');
        editButton.classList.add("ass-edit-button");
        // editButton.onclick = () => editAssignmentFromCourse(courseId, assignment.id); // Assuming this function handles deletion

        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.className = 'checkbox-wrapper';
        const deleteButtonWrapper = document.createElement('div');
        deleteButtonWrapper.className = 'delete-button-wrapper';
        
        checkboxWrapper.appendChild(checkbox);

        // Append each detail directly to assignmentElement
        assignmentElement.appendChild(nameElement);
        assignmentElement.appendChild(gradeElementWrapper);
        assignmentElement.appendChild(assignmentWeightedScoreWrapper);
        // assignmentElement.appendChild(checkboxWrapper);
        assignmentElement.appendChild(deleteButtonWrapper);
        deleteButtonWrapper.appendChild(completionButton);
        deleteButtonWrapper.appendChild(editButton);
        deleteButtonWrapper.appendChild(deleteButton);

        // Append the assignment element to the grades section
        gradesSection.appendChild(assignmentElement);
    });
    updateOverallGradeDisplay();
    console.log(`New assignments generated and appended to grades section`);
}

function displayCourses() {
    const coursesLoadedDiv = document.querySelector('.courses-loaded');

    // Check if the div exists before attempting to clear its content
    if (!coursesLoadedDiv) {
        console.warn('Could not find .courses-loaded');
        return; // Exit the function if the div is not found
    }

    // Clear existing content
    coursesLoadedDiv.innerHTML = '';

    // Generate HTML for each course and append to the "courses-loaded" div
    courseManager.courses.forEach(course => {
        const courseSection = document.createElement('div');
        courseSection.className = 'course';

        // Create the app title heading
        const appTitleHeading = document.createElement('h2');
        appTitleHeading.textContent = 'Course Stats';
        appTitleHeading.style.textAlign = 'center'; // Center align the text
        courseSection.appendChild(appTitleHeading);

        let menuInfoDiv = document.createElement('div');
        menuInfoDiv.classList.add('menu-info');
        menuInfoDiv.style.display = 'flex'; // Format children as a row
        courseSection.appendChild(menuInfoDiv);

        // menu info div internal container 2
        let menuInternalInfoDiv2 = document.createElement('div');
        menuInternalInfoDiv2.classList.add('menu-info-internal');
        menuInfoDiv.appendChild(menuInternalInfoDiv2);

        // Add completion stats label
        // let completionStatsLabel = document.createElement('h2');
        // completionStatsLabel.innerText = 'Stats :';
        // menuInternalInfoDiv2.appendChild(completionStatsLabel);

        // Create the overall grade div
        const overallGradeDiv = document.createElement('div');
        overallGradeDiv.className = 'overall-grade';

        // Insert "Grades :" title to the menu-info-internal
        let gradesTitle = document.createElement('h3');
        gradesTitle.innerText = 'Grades :';
        gradesTitle.style.fontSize = '24px'; // Set font size to 20
        gradesTitle.style.textAlign = 'left'; // Justify text to the left
        gradesTitle.style.justifyContent = 'center'; // Center justify the text
        menuInternalInfoDiv2.appendChild(gradesTitle);

        // Create the overall grade paragraph
        const overallGradeParagraph = document.createElement('h4');
        overallGradeParagraph.id = 'overall-grade';
        overallGradeParagraph.style.color = 'white';
        overallGradeParagraph.style.fontSize = '19px'; // Set font size to 21
        overallGradeParagraph.textContent = 'Overall Grade: 0.00%';
        overallGradeParagraph.style.fontWeight = 'normal';
        menuInternalInfoDiv2.appendChild(overallGradeParagraph);

        // Add incomplete task count
        let incompleteTaskCount = document.createElement('h3');
        incompleteTaskCount.innerText = `Highest Grade: N/A feature IP`;
        incompleteTaskCount.style.color = 'white';
        incompleteTaskCount.style.fontSize = '19px'; // Set font size to 21
        // make it normal, not bold
        incompleteTaskCount.style.fontWeight = 'normal';
        menuInternalInfoDiv2.appendChild(incompleteTaskCount);

        // Add operations title
        let operationsTitle = document.createElement('h3');
        operationsTitle.innerText = '- Operations -';
        operationsTitle.style.fontSize = '24px'; // Set font size to 20
        operationsTitle.style.textAlign = 'center'; // Center align the text
        operationsTitle.style.justifyContent = 'center'; // Center justify the text
        overallGradeDiv.appendChild(operationsTitle);

        //creata a askMenuContainer div to hold the menu info div and the meta task div
        let taskMenuContainer = document.createElement('div');
        taskMenuContainer.classList.add('course-menu-buttons');
        overallGradeDiv.appendChild(taskMenuContainer);

        // create meta task div to hold task operations and task title
        let metaTaskDiv = document.createElement('div');
        metaTaskDiv.classList.add('meta-task');
        taskMenuContainer.appendChild(metaTaskDiv);

        // Create the nav-menu-buttons div
        const navMenuButtonsDiv = document.createElement('div');
        navMenuButtonsDiv.classList.add('nav-menu-buttons');
        navMenuButtonsDiv.classList.add('nav-element');
        // metaTaskDiv.appendChild(navMenuButtonsDiv); i append further down now

        // Create the course dropdown select element
        const courseDropdown = document.createElement('select');
        courseDropdown.id = 'course-dropdown';
        courseDropdown.required = true;
        navMenuButtonsDiv.appendChild(courseDropdown);

        // Add event listener to the newly created course dropdown
        courseDropdown.addEventListener('change', () => {
            courseManager.selectedCourse = courseManager.getCourseById(courseDropdown.value);
            if (courseManager.selectedCourse) {
                alert("FUCK");
                updateAssignmentsDisplay(courseManager.selectedCourse.id);
                displayCourses(); // Re-display courses to show/hide the selected one
            }
        });

        // Create the default option for the course dropdown
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = 'Select or add a course to start';
        courseDropdown.appendChild(defaultOption);

        // Create the options for the course dropdown
        courseManager.courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.id;
            option.textContent = course.title;
            courseDropdown.appendChild(option);
        });

        // Create the add course button
        const addCourseButton = document.createElement('button');
        addCourseButton.id = 'open-popup-btn';
        addCourseButton.textContent = 'Add Course';
        navMenuButtonsDiv.appendChild(addCourseButton);

        // Create the nav-menu-buttons div2
        const navMenuButtonsDiv2 = document.createElement('div');
        navMenuButtonsDiv.classList.add('nav-menu-buttons');
        navMenuButtonsDiv.classList.add('nav-element');
        metaTaskDiv.appendChild(navMenuButtonsDiv2);

        // Add task button
        let operationsplaceholder1 = document.createElement('button'); // NEED TO ADD PROPER FUNCTIONALITY ---------------------------------------------------------
        operationsplaceholder1.id = 'operationsplaceholder1';
        operationsplaceholder1.innerText = 'Placeholder';
        operationsplaceholder1.style.marginRight = '15px'; // Add right margin
        navMenuButtonsDiv2.appendChild(operationsplaceholder1);

        // Filter tasks button
        let operationsplaceholder2 = document.createElement('button');
        operationsplaceholder2.id = 'operationsplaceholder2';

        operationsplaceholder2.innerText = 'Placeholder';
        operationsplaceholder2.style.marginRight = '15px'; // Add right margin
        navMenuButtonsDiv2.appendChild(operationsplaceholder2);

        // Sort tasks button
        let operationsplaceholder3 = document.createElement('button');
        operationsplaceholder3.id = 'operationsplaceholder3';
        operationsplaceholder3.innerText = 'Placeholder';
        operationsplaceholder3.style.marginRight = '5px'; // Add right margin
        navMenuButtonsDiv2.appendChild(operationsplaceholder3);
        
        
        
        metaTaskDiv.appendChild(navMenuButtonsDiv); 
        //----------------------------------------------------------------------------------------------------------------

        // Append the overall grade div to the coursesLoadedDiv
        courseSection.appendChild(overallGradeDiv);

        courseSection.dataset.id = course.id; // Setting the data-id attribute

        // Create the grades section
        const gradesSection = document.createElement('div');
        gradesSection.className = 'grades-section';
        courseSection.appendChild(gradesSection);

        // Create the course name element
        const courseNameElement = document.createElement('h3');
        courseNameElement.textContent = course.title;
        courseNameElement.style.textAlign = 'center'; // Center align the text
        courseNameElement.style.display = 'flex'; // Set display to flex
        courseNameElement.style.justifyContent = 'center'; // Center justify the content
        courseNameElement.style.alignItems = 'center'; // Center align the items
        gradesSection.appendChild(courseNameElement);

        // Create the course grade element
        const courseGradeElement = document.createElement('h5');
        courseGradeElement.id = 'course-grade'+course.id;
        courseGradeElement.textContent = "0.00%";
        gradesSection.appendChild(courseGradeElement);

        // Create the legend div
        const legendDiv = document.createElement('div');
        legendDiv.className = 'legend';

        // Populate the legend div with names, grades, weighted grades, completion, and operations
        ['Name', 'Grade', 'Weighted Grade', 'Operations'].forEach(text => {
            const legendItem = document.createElement('div');
            legendItem.textContent = text;
            legendDiv.appendChild(legendItem);
        });

        gradesSection.appendChild(legendDiv);

        // Create the add assignment button
        const addAssignmentButton = document.createElement('button');
        addAssignmentButton.textContent = "Add Assignment";
        addAssignmentButton.classList.add("complete");
        addAssignmentButton.onclick = () => openAddAssignmentPopup(course.id);
        
        // Create the delete course button
        const deleteCourseButton = document.createElement('button');
        deleteCourseButton.textContent = "Delete Course \u{1F5D1}";
        deleteCourseButton.id = 'delete-course-btn';
        deleteCourseButton.classList.add("ass-delete-button");
        deleteCourseButton.classList.add("delete-btn");

        // Attach the event listener to the delete button
        deleteCourseButton.addEventListener('click', () => {
            console.log('Delete button clicked');
            deleteCourse(course.id);
            deleteCourseButton.disabled = true;
            setTimeout(() => {
                deleteCourseButton.disabled = false;
            }, 1000);
        });

        // create a div for the delete course and assignment button
        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'button-div';
        addAssignmentButton.classList.add('secondary');
        deleteCourseButton.classList.add('secondary');
        buttonDiv.appendChild(addAssignmentButton);
        buttonDiv.appendChild(deleteCourseButton);
        courseSection.appendChild(buttonDiv);

        // Append the course section to the "courses-loaded" div
        coursesLoadedDiv.appendChild(courseSection);

        // Toggle visibility based on selection
        if (course.id === document.getElementById('course-dropdown').value) {
            courseSection.classList.remove('hidden');
            updateAssignmentsDisplay(course.id);
        } else {
            courseSection.classList.add('hidden');
        }
    });
}

function openAddCoursePopup() {
    document.getElementById('popup-menu').style.display = 'block';
    showOverlay();
}

function closeAddCoursePopup() {
    document.getElementById('popup-menu').style.display = 'none';
    hideOverlay();
}

function addCourseFromPopup() {
    const courseNameInput = document.getElementById('course-name-input').value;
    if (!courseNameInput.trim()) {
        alert("Please enter a course name.");
        return;
    }

    const course = courseManager.addCourse(courseNameInput);
    closeAddCoursePopup();
    populateCourseDropdown();

    // Ensure the newly added course is selected in all instances of the dropdown and refresh the display
    const courseDropdowns = document.querySelectorAll('#course-dropdown');
    courseDropdowns.forEach(dropdown => {
        dropdown.value = courseManager.selectedCourse;
    });
    displayCourses();
}

function openAddAssignmentPopup() {
    document.getElementById('assignment-popup').style.display = 'block';
    showOverlay();
}

function closeAddAssignmentPopup() {
    document.getElementById('assignment-popup').style.display = 'none';
    hideOverlay();
}

function addAssignmentFromPopup() {
    const assignmentName = document.getElementById('assignment-name-input').value;
    const assignmentGrade = parseFloat(document.getElementById('assignment-grade-input').value);
    const assignmentWeight = parseInt(document.getElementById('assignment-weight-input').value);

    if (!assignmentName || isNaN(assignmentGrade) || isNaN(assignmentWeight)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const selectedCourseId = document.getElementById('course-dropdown').value;
    if (!selectedCourseId) {
        alert("Please select a course.");
        return;
    }

    const assignment = courseManager.addAssignmentToCourse(selectedCourseId, {id: Math.random().toString(36).substring(7), name: assignmentName, grade: assignmentGrade, weight: assignmentWeight});
    updateAssignmentsDisplay(selectedCourseId);
    closeAddAssignmentPopup();
}

function removeAssignmentFromCourse(courseId, assignmentId) {
    const course = courseManager.getCourseById(courseId);
    if (course && course.assignments) {
        course.assignments = course.assignments.filter(assignment => assignment.id !== assignmentId);
        console.log(`Assignment with ID ${assignmentId} removed from course with ID ${courseId}`);
        updateAssignmentsDisplay(courseId);
    }
}

function updateOverallGradeDisplay() {
    
    const selectedCourseId = document.getElementById('course-dropdown').value;


    // if (courseManager.selectedCourse) {
    //     selectedCourseId = courseManager.selectedCourse.id;
    // } else {
    //     console.error("No course selected");
    // }

    const course = courseManager.getCourseById(selectedCourseId);
    
    if (course) {
        course.recalculateCourseGrade();
        const courseGradeElement = document.getElementById('course-grade'+course.id);
        courseGradeElement.textContent = `Grade: ${course.courseGrade.toFixed(2)}%`;
        // make the ext white
        courseGradeElement.style.color = 'white';
        console.log(`Course grade recalculated and displayed: ${course.courseGrade.toFixed(2)}%`);
    }

    const overallGrade = courseManager.calculateOverallGrade();
   

    const overallGradeElements = document.querySelectorAll('#overall-grade');
    overallGradeElements.forEach(element => {
        element.textContent = `Overall Grade: ${overallGrade.toFixed(2)}%`;
    });
    console.log(`Overall grade recalculated and displayed: ${overallGrade.toFixed(2)}%`);
}

function deleteCourse(courseId) {
    courseManager.removeCourse(courseId);
    if (courseManager.courses.length > 0) {
        document.getElementById('course-dropdown').value = courseManager.courses[0].id;
    }
    populateCourseDropdown();
    displayCourses();
    updateOverallGradeDisplay();
}

function showOverlay() {
    var overlay = document.querySelector('.overlay');
    overlay.style.display = 'block';
}

function hideOverlay() {
    var overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';
}

function saveData() {
    // Save the courseManager object to a file
    saveToFile(courseManager);
}

function loadFromFile(file) {        
    if (!file) {
        console.error("No file selected.");
        return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
        try {
            const savedCourseManager = JSON.parse(event.target.result);

            // print all of the information from the file
            console.log(savedCourseManager);
            
            if (!savedCourseManager || !Array.isArray(savedCourseManager.courses)) {
                throw new Error("Invalid data format.");
            }
            
            savedCourseManager.courses.forEach(course => {
                const newCourse = courseManager.addCourseLoad(course.title, course.id, course.assignments);
                console.log(`Course loaded: ${newCourse.id}` + ` ${newCourse.title}` + ` ${newCourse.assignments}`);
                populateCourseDropdown();
            });

            // select the last course in the dropdown
            document.getElementById('course-dropdown').value = courseManager.courses[courseManager.courses.length - 1].id;
            displayCourses();
            updateOverallGradeDisplay();

            // erase the old taskmanager, and create a new one based on the object stored in the coursemanager
            // taskManager.eraseTasks();
            // taskManager.loadTasks(savedCourseManager.tasks);

        } catch (error) {
            console.error("Error while processing file:", error);
        }
    };

    reader.onerror = (event) => {
        console.error("File read error:", event.target.error);
    };

    reader.readAsText(file);
}

function insertDemoData() {
    const demoData = {
        courses: [
            {
                id: "2",
                title: "Science",
                assignments: [
                    { id: "4", name: "Biology Test", grade: 80, weight: 25, completed: true },
                    { id: "5", name: "Chemistry Test", grade: 85, weight: 35, completed: true },
                ]
            }, {
                id: "1",
                title: "Math",
                assignments: [
                    { id: "1", name: "Algebra Test", grade: 85, weight: 20, completed: true },
                    { id: "2", name: "Geometry Test", grade: 90, weight: 30, completed: true },
                ]
            }
        ]
    };

    courseManager.courses = [];

    demoData.courses.forEach(course => {
        const newCourse = courseManager.addCourseLoad(course.title, course.id, course.assignments);
        console.log(`Course loaded: ${newCourse.id}` + ` ${newCourse.title}` + ` ${newCourse.assignments}`);
    });



    // Create mock tasks and add the tasks to the task manager
    taskManager.tasks = [];

    for (let i = 1; i <= 20; i++) {
        const courseOptions = ['Math', 'Science', 'History'];
        const randomCourse = courseOptions[Math.floor(Math.random() * courseOptions.length)];
        const taskName = `Task ${i}`;
        const dueDate = getRandomDate(new Date('2024-07-31'), new Date('2024-12-31'));
        taskManager.AddTask(taskName, 0, 0, randomCourse, dueDate);
    }

    function getRandomDate(startDate, endDate) {
        const start = startDate.getTime();
        const end = endDate.getTime();
        const randomTime = start + Math.random() * (end - start);
        return new Date(randomTime);
    }

    taskManager.display();
    taskManager.updateTimeRemaining();

    // select the first course in the dropdown
    populateCourseDropdown();
    document.getElementById('course-dropdown').value = courseManager.courses[1].id;
    console.log(document.getElementById('course-dropdown').value);
    displayCourses();
    updateOverallGradeDisplay();
    console.log(document.getElementById('course-dropdown').value);
    console.log(taskManager);
}

document.addEventListener('DOMContentLoaded', (event) => {
    const fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        loadFromFile(file);
    });

    const courseDropdowns = document.querySelectorAll('#course-dropdown');
    courseDropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', () => {
            const selectedCourseId = dropdown.value;
            courseManager.selectedCourse = courseManager.getCourseById(selectedCourseId);
            if (selectedCourseId) {
                alert("Boingo");
                updateAssignmentsDisplay(courseManager.selectedCourse.id);
                displayCourses(); // Re-display courses to show/hide the selected one
            }
        });
    });

    // save button
    document.getElementById('save-btn').addEventListener('click', saveData);

    // Open Course Popup Button
    document.getElementById('open-popup-btn').addEventListener('click', openAddCoursePopup);

    // Close Course Popup
    document.querySelector('.close').addEventListener('click', closeAddCoursePopup);

    // Add Course Popup - Button
    document.getElementById('add-course-popup-btn').addEventListener('click', addCourseFromPopup);

    // Close Assignment Popup
    document.querySelector('.close-popup').addEventListener('click', closeAddAssignmentPopup);

    // Add Assignment Popup - Button
    document.getElementById('add-assignment-popup-btn').addEventListener('click', addAssignmentFromPopup);

    // Add Task Popup - Button
    document.getElementById('add-task-popup-btn').addEventListener('click', () => {
        taskManager.addTaskFromPopup();
    });

    // Close task Popup
    document.getElementById('close-task-popup').addEventListener('click', taskManager.hideTaskPopup);

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
        displayCourses();
    });

    // Add calendar button, displays courses when clicked
    const calendarButton = document.getElementById('calendar-btn');
    calendarButton.addEventListener('click', () => {
        clearHighlight();
        calendarButton.classList.add('highlight');
        calendarManager.display();
    });

    // Initialize the dropdown with existing courses
    populateCourseDropdown();
    displayCourses();
    updateOverallGradeDisplay();
    
    // Load demo data with function
    insertDemoData();
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