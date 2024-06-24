class CalendarManager {
    constructor () {
        this.eventArray = [];
        this.eventArrayDates = [];
    }

    display() {
        // Clear existing content
        let coursesLoadedDiv = document.querySelector('.courses-loaded');
        coursesLoadedDiv.innerHTML = '';
    }
}