class CourseManager {
    constructor() {
        this.courses = [];
        this.selectedCourse = null;
    }

    calculateOverallGrade() {
        let totalGrade = 0;
        let totalWeight = this.courses.length;
        this.courses.forEach(course => {
            if (course.courseGrade!== null) { // Ensure course has a grade
                totalGrade += course.courseGrade;
            }
        });
        return totalWeight > 0? totalGrade / totalWeight : 0;
    }

    addCourse(title) {
        const newCourse = new Course(this.generateUniqueId(), title, []);
        this.courses.push(newCourse);
        console.log(`Course ${title} added successfully`);
        return newCourse;
    }

    addCourseLoad(title, id, assignments) {
        const newCourse = new Course(id, title, assignments);
        newCourse.recalculateCourseGrade();
        this.courses.push(newCourse);
        console.log(`Course ${title} added successfully v2`);
        return newCourse;
    }

    generateUniqueId() {
        return Math.random().toString(36).substring(7);
    }

    getCourseById(id) {
        return this.courses.find(course => course.id === id);
    }

    removeCourse(id) {
        this.courses = this.courses.filter(course => course.id!== id);
    }
    
    addAssignmentToCourse(courseId, assignmentDetails) {
        const course = this.courses.find(c => c.id === courseId);
        if (!course) {
            throw new Error("Course not found");
        }
        course.addAssignment(assignmentDetails); // This line was causing the error
    }

    removeAssignmentFromCourse(courseId, assignmentId) {
        const course = this.courses.find(c => c.id === courseId);
        if (!course) {
            throw new Error("Course not found");
        }
        course.removeAssignment(assignmentId);
    }

    displayCourses() {
        console.log("Courses:");
        this.courses.forEach(course => {
            console.log(`Course: ${course.title}`);
            console.log(`Assignments: ${course.assignments.length}`);
            console.log(`Grade: ${course.courseGrade}`);
        });
    }

    displayCourseAssignments(courseId) {
        const course = this.courses.find(c => c.id === courseId);
        if (!course) {
            throw new Error("Course not found");
        }
        console.log(`Assignments for course ${course.title}:`);
        course.assignments.forEach(assignment => {
            console.log(`Assignment: ${assignment.title}`);
            console.log(`Grade: ${assignment.grade}`);
            console.log(`Weight: ${assignment.weight}`);
        });
    }

    selectCourse(courseId) {
        this.selectedCourse = this.courses.find(c => c.id === courseId);
    }

    getSelectedCourse() {
        return this.selectedCourse;
    }
}
