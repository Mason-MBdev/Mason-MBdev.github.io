let selectedPiece = null;

function getPieceFromCell(cell) {
    const row = parseInt(cell.dataset.y);
    const column = parseInt(cell.dataset.x);
    return board.pieces[row - 1][column - 1];
}

function handleCellClick(event) {
    const cell = event.target;
    const piece = getPieceFromCell(cell);

    // if there is no selected piece
    if (!selectedPiece) {
        // if piece, and belongs to the ucurrent player
        if (piece && piece.teamColor !== board.currentPlayer) {
            console.log('Piece does not belong to the current player');
            return;
        }

        selectedPiece = piece;
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList.remove('highlight'));
        cell.classList.add('highlight');
        console.log(`Selected ${selectedPiece.constructor.name} at ${cell.dataset.x}${cell.dataset.y}`);
        // increase the font size of the selected piece until is is deselected
        cell.style.fontSize = '65px';
    } else {

        // deselecting a piece that is currently selected by clicking on it
        if (selectedPiece === piece) {
            console.log('Piece already selected, deselecting...');
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => cell.classList.remove('highlight'));
            selectedPiece = null;
            cell.style.fontSize = '60px';
            return;
        }

        // placing piece
        console.log('Piece currently selected, placing...');
        cell.style.fontSize = '60px';
        const row = parseInt(cell.dataset.y);
        const column = parseInt(cell.dataset.x);
        const newPosition = { row, column };

        // QUARANTINE --------------------------------------------------------------------------------------------------
        // Function should check if the current player just moved their own king into check
        
        const whiteKing = board.findKingByTeamColor('white');
        const blackKing = board.findKingByTeamColor('black');

        // Find the king of the current player
        const currentPlayerKing = board.findKingByTeamColor(board.currentPlayer);

        console.log("Current player's king: ", currentPlayerKing);

        // Simulate the move to check for self-check
        const originalPosition = selectedPiece.currentPosition;
        selectedPiece.currentPosition = newPosition;
        const isSelfCheck = currentPlayerKing.isInCheck();
        console.log('Is self check 1: ', isSelfCheck);
        if (finalKingCheck(whiteKing)) {
            isSelfCheck = True;
        }
        console.log('Is self check 2: ', isSelfCheck);

        // Revert the simulated move
        selectedPiece.currentPosition = originalPosition;

        if (isSelfCheck) {
            console.log('Move would put your own king in check');
            return;
        }

        // QUARANTINE --------------------------------------------------------------------------------------------------

        console.log(`Moving to ${column}${row}`);
        let moveSuccess = board.movePiece(originalPosition, newPosition);

        if (moveSuccess) {
            displayBoard(board);
            console.log('Piece placed');
            board.switchPlayer();

            // QUARANTINE --------------------------------------------------------------------------------------------------
    
            // function to check if either king is in check

            // Old code
            // // After the move, check if either king is in check
            const whiteKing = board.findKingByTeamColor('white');
            const blackKing = board.findKingByTeamColor('black');
    
            if (whiteKing && whiteKing.isInCheck()) {
                console.log('White king is in check');
                if (!board.canKingEscape(whiteKing.currentPosition)) {
                    endGame("Black");
                }
            }
    
            if (blackKing && blackKing.isInCheck()) {
                console.log('Black king is in check KING FLAG 1');
                if (!board.canKingEscape(blackKing.currentPosition)) {
                    endGame("White");
                }
            }

            // QUARANTINE --------------------------------------------------------------------------------------------------

        } else {
            console.log('Invalid move');
        }

        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList.remove('highlight'));
        selectedPiece = null;
        const timerElement1 = document.getElementById('black-timer');
        const timerElement2 = document.getElementById('white-timer');
        timer.switchPlayer(timerElement1, timerElement2);
        timer.updateTimerElement(timerElement1, timerElement2);
    }
}

function finalKingCheck (whiteKing) {
    // this function is called after a move is made to check if the king is in check
    // After the move, check if either king is in check, return true if in check
    // from the position of the king outwards, check if there is any enemy piece that would be capable of attacking from that angle
    // Check for enemy pieces attacking from the left
    for (let i = whiteKing.col - 1; i >= 0; i--) {
        const piece = board.pieces[whiteKing.row][i];
        if (piece && piece.teamColor === 'black' && piece.canAttack(whiteKing)) {
            return true;
        }
    }

    // Check for enemy pieces attacking from the right
    for (let i = whiteKing.col + 1; i < 8; i++) {
        const piece = board.pieces[whiteKing.row][i];
        if (piece && piece.teamColor === 'black' && piece.canAttack(whiteKing)) {
            return true;
        }
    }

    // Check for enemy pieces attacking from above
    for (let i = whiteKing.row - 1; i >= 0; i--) {
        const piece = board.pieces[i][whiteKing.col];
        if (piece && piece.teamColor === 'black' && piece.canAttack(whiteKing)) {
            return true;
        }
    }

    // Check for enemy pieces attacking from below
    for (let i = whiteKing.row + 1; i < 8; i++) {
        const piece = board.pieces[i][whiteKing.col];
        if (piece && piece.teamColor === 'black' && piece.canAttack(whiteKing)) {
            return true;
        }
    }

    // Check for enemy pieces attacking diagonally from top-left to bottom-right
    for (let i = 1; whiteKing.row - i >= 0 && whiteKing.col - i >= 0; i++) {
        const piece = board.pieces[whiteKing.row - i][whiteKing.col - i];
        if (piece && piece.teamColor === 'black' && piece.canAttack(whiteKing)) {
            return true;
        }
    }

    // Check for enemy pieces attacking diagonally from top-right to bottom-left
    for (let i = 1; whiteKing.row - i >= 0 && whiteKing.col + i < 8; i++) {
        const piece = board.pieces[whiteKing.row - i][whiteKing.col + i];
        if (piece && piece.teamColor === 'black' && piece.canAttack(whiteKing)) {
            return true;
        }
    }

    // Check for enemy pieces attacking diagonally from bottom-left to top-right
    for (let i = 1; whiteKing.row + i < 8 && whiteKing.col - i >= 0; i++) {
        const piece = board.pieces[whiteKing.row + i][whiteKing.col - i];
        if (piece && piece.teamColor === 'black' && piece.canAttack(whiteKing)) {
            return true;
        }
    }

    // Check for enemy pieces attacking diagonally from bottom-right to top-left
    for (let i = 1; whiteKing.row + i < 8 && whiteKing.col + i < 8; i++) {
        const piece = board.pieces[whiteKing.row + i][whiteKing.col + i];
        if (piece && piece.teamColor === 'black' && piece.canAttack(whiteKing)) {
            return true;
        }
    }
    return false;
}