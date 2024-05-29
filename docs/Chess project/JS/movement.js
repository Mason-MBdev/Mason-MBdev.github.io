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
    } else {

        // deselecting a piece that is currently selected by clicking on it
        if (selectedPiece === piece) {
            console.log('Piece already selected, deselecting...');
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => cell.classList.remove('highlight'));
            selectedPiece = null;
            return;
        }

        // placing piece
        console.log('Piece currently selected, placing...');
        const row = parseInt(cell.dataset.y);
        const column = parseInt(cell.dataset.x);
        const newPosition = { row, column };

        // QUARANTINE --------------------------------------------------------------------------------------------------
        // Function should check if the current player just moved their own king into check
        
        // Find the king of the current player
        const currentPlayerKing = board.findKingByTeamColor(board.currentPlayer);

        console.log("Current player's king: ", currentPlayerKing);

        // Simulate the move to check for self-check
        const originalPosition = selectedPiece.currentPosition;
        selectedPiece.currentPosition = newPosition;
        const isSelfCheck = currentPlayerKing.isInCheck();

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
            // const whiteKing = board.findKingByTeamColor('white');
            // const blackKing = board.findKingByTeamColor('black');
    
            // if (whiteKing && whiteKing.isInCheck()) {
            //     console.log('White king is in check');
            //     if (!board.canKingEscape(whiteKing.currentPosition)) {
            //         alert('White king is in checkmate! Game over!');
            //         // Handle checkmate or stalemate condition
            //     }
            // }
    
            // if (blackKing && blackKing.isInCheck()) {
            //     console.log('Black king is in check KING FLAG 1');
            //     if (!board.canKingEscape(blackKing.currentPosition)) {
            //         alert('Black king is in checkmate! Game over!');
            //         // Handle checkmate or stalemate condition
            //     }
            // }

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

