function displayBoard(board) {
    const boardElement = document.getElementById('chessboard');
    boardElement.innerHTML = '';
    for (let row = 1; row <= 8; row++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        for (let column = 1; column <= 8; column++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.x = column; // Add x coordinate
            cellElement.dataset.y = row; // Add y coordinate
            if ((row + column) % 2 === 0) {
                cellElement.classList.add('white');
            } else {
                cellElement.classList.add('black');
            }
            const piece = board.pieces[row - 1][column - 1];
            if (piece) {
                cellElement.textContent = piece.unicodeChar;
            }
            rowElement.appendChild(cellElement);
        }
        boardElement.appendChild(rowElement);
    }
    addEventListenersToCells();

    // highlight the cell of a king that is in check
    const whiteKing = board.findKingByTeamColor('white');
    const blackKing = board.findKingByTeamColor('black');
    if (whiteKing && whiteKing.isInCheck()) {
        const cell = document.querySelector(`.cell[data-x="${whiteKing.currentPosition.column}"][data-y="${whiteKing.currentPosition.row}"]`);
        cell.classList.add('check');
    }
    if (blackKing && blackKing.isInCheck()) {
        const cell = document.querySelector(`.cell[data-x="${blackKing.currentPosition.column}"][data-y="${blackKing.currentPosition.row}"]`);
        cell.classList.add('check');
    }
}


function addEventListenersToCells() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
}

function openMenuPopup() {
    document.getElementById('popup-menu').style.display = 'block';
    showOverlay();
}

function closeMenuPopup() {
    setTimeout(() => {
        document.getElementById('popup-menu').style.display = 'none';
        hideOverlay();
    }, 150);
}

function openGameOverPopup(winningTeam) {
    // Fill in this information:
    // <h2 id="gameover-menu-winner"></h2>
    // <h3 id="gameover-menu-reason"></h3>
    // <h3 id="gameover-menu-score"></h3>
    // <h3 id="gameover-menu-time"></h3>
    // <h3 id="gameover-menu-pieces"></h3>
    // wait 1 second
    setTimeout(() => {
        console.log('showing game over popup');
    }, 1000);
    showMenu2();

    document.getElementById('gameover-menu').classList.add('animate');
    
    document.getElementById('gameover-menu-winner').textContent = winningTeam + ' Player ' + 'Wins!';
    document.getElementById('gameover-menu-score-white').textContent = 'Score: ' + calculateScore("white");
    document.getElementById('gameover-menu-score-black').textContent = 'Score: ' + calculateScore("black");
    document.getElementById('gameover-menu-pieces-white').textContent = '' + calculateTakenPieces("white");
    document.getElementById('gameover-menu-pieces-black').textContent = '' + calculateTakenPieces("black");

    function calculateScore(teamColour) {
        console.log('calculating score for: ' + teamColour);
        if (teamColour === 'white') {
            // if there are no pieces taken, return "No captured pieces"
            if (takenPieces.white.length === 0) {
                return "No captured pieces";
            }
    
            return parseInt(document.getElementById('white-score').textContent);
        } else {
            // if there are no pieces taken, return "No captured pieces"
            if (takenPieces.black.length === 0) {
                return "No captured pieces";
            }
            return parseInt(document.getElementById('black-score').textContent);
        }
    }

    function calculateTakenPieces(teamColour) {
        // use the takenPieces object to get the taken pieces and display them in the popup
        console.log('calculating taken pieces for: ' + teamColour);
        if (teamColour === 'white') {
            return takenPieces.white.join(' ');
        } else {
            return takenPieces.black.join(' ');
        }
    }
    showOverlay();
}

function closeGameOverPopup() {
    document.getElementById('gameover-menu').classList.add('hidden');
    document.getElementById('gameover-menu').classList.remove('animate');
    setTimeout(() => {
        location.reload();
    }, 300);
}

// Function to show the menu
function showMenu2() {
    var gameoverMenu = document.getElementById('gameover-menu');
    gameoverMenu.classList.add('animate');
}

// Function to hide the menu
function hideMenu2() {
    var gameoverMenu = document.getElementById('gameover-menu');
    gameoverMenu.classList.remove('animate');
}

function showOverlay() {
    var overlay = document.querySelector('.overlay');
    overlay.style.display = 'block';
}

function hideOverlay() {
    var overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';
}

showSettingsMenu = () => {
    document.getElementById('settings-menu').style.display = 'block';
    showOverlay();
}

closeSettingsMenu = () => {
    document.getElementById('settings-menu').style.display = 'none';
    hideOverlay();
}

class TakenPieces {
    constructor() {
        this.white = [];
        this.black = [];
    }

    increaseScoreCounter(teamColour, piece) {
        console.log('increasing score for ' + teamColour + ' team');
        if (teamColour === 'white') {
            let score = document.getElementById('white-score');
            score.textContent = parseInt(score.textContent) + 1;
            takenPieces.white.push(piece.unicodeChar);
        } else {
            let score = document.getElementById('black-score');
            score.textContent = parseInt(score.textContent) + 1;
            takenPieces.black.push(piece.unicodeChar);
        }
    }
    
    // render the taken pieces on the screen of both teams
    renderTakenPieces() {
        console.log('rendering taken pieces');
        let white = document.getElementById('piece-box-white');
        let black = document.getElementById('piece-box-black');
        white.innerHTML = '';
        black.innerHTML = '';
        for (let i = 0; i < takenPieces.white.length; i++) {
            let piece = document.createElement('div');
            piece.textContent = takenPieces.white[i];
            white.appendChild(piece);
        }
        for (let i = 0; i < takenPieces.black.length; i++) {
            let piece = document.createElement('div');
            piece.textContent = takenPieces.black[i];
            black.appendChild(piece);
        }
    }
}

