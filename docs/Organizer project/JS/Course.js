// Course.js
class Course {
    constructor(id, title, assignments = [], overallGrade = null) {
        this.id = parseInt(id);
        this.title = title;
        this.assignments = assignments; // Array of assignments directly linked to the course
        this.overallGrade = overallGrade; // Overall grade for the course
        this.assignmentIdCounter = 0;
        this.highestGradeAssignment = null;
        this.completedAssignments = 0;
        this.incompleteAssignments = 0;
    }

    getCompletedAssignmentsCount() {
        this.completedAssignments = this.assignments.filter(assignment => assignment.completed).length;
        this.incompleteAssignments = this.assignments.length - this.completedAssignments;
        return this.completedAssignments;
    }
    
    // Method to recalculate the course grade and store the highest grade assignment
    recalculateCourseGrade() {
        let totalWeight = 0;
        let totalPoints = 0;
        this.assignments.forEach(assignment => {

            if (!this.highestGradeAssignment || assignment.grade > this.highestGradeAssignment.grade) {
                this.highestGradeAssignment = assignment;
            }

            console.log(`assignment: ${assignment.name} grade: ${assignment.grade} weight: ${assignment.weight} completed: ${assignment.completed}`);
            if (assignment.completed) {
                totalPoints += assignment.grade * (assignment.weight / 100);
                totalWeight += assignment.weight;
            }
        });
        console.log(`total points: ${totalPoints} total weight: ${totalWeight}`);

        this.overallGrade = (totalPoints / totalWeight) * 100 || 0;
        console.log(`course name: ${this.title} grade recalculated: ${this.overallGrade.toFixed(2)}%`);
    }

    // Calculate the weighted sum of grades
    calculateWeightedSum() {
        return parseFloat(this.assignments.reduce((sum, assignment) => sum + assignment.grade * assignment.weight / 100, 0).toFixed(2));
    }

    // Method to add an assignment to the course
    addAssignment(assignment) {
        // print the internal assignment details
        console.log(assignment);
        assignment.id = this.assignmentIdCounter++;
        this.assignments.push(assignment);
    }

    // Method to remove an assignment from the course
    removeAssignment(assignmentId) {
        assignmentId = parseInt(assignmentId);
        this.assignments = this.assignments.filter(assignment => assignment.id!== assignmentId);
    }

    editAssignment (newAssignment, assignmentId) {
        assignmentId = parseInt(assignmentId);
        const assignment = this.assignments.find(assignment => assignment.id === assignmentId);
        
        if (assignment) {
            assignment.name = newAssignment.name;
            assignment.grade = newAssignment.grade;
            assignment.weight = newAssignment.weight;
            assignment.completed = newAssignment.completed;
        }
    }
}
