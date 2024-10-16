document.addEventListener('DOMContentLoaded', function() {
    const selectAllButton = document.getElementById('select-all');
    const selectWebButton = document.getElementById('select-web');
    const selectEleButton = document.getElementById('select-ele');

    selectAllButton.addEventListener('click', function() {
        changeDisplayStatus('all');
    });

    selectWebButton.addEventListener('click', function() {
        changeDisplayStatus('web');
    });

    selectEleButton.addEventListener('click', function() {
        changeDisplayStatus('ele');
    });

    function changeDisplayStatus(type) {
        const projectDivs = document.querySelectorAll('.hidden-left');
        projectDivs.forEach(div => {
            if (type === 'all') {
                div.style.display = 'block';
            } else if (div.classList.contains(type)) {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        });
    }
});