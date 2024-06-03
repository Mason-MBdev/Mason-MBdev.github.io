class Piece {
    constructor(currentPosition, teamColor) {
        this.currentPosition = currentPosition;
        this.teamColor = teamColor;
    }

    isValidMove(newPosition) {
        if (board.pieces[newPosition.row - 1][newPosition.column - 1] && board.pieces[newPosition.row - 1][newPosition.column - 1].teamColor === this.teamColor) {
            console.log(`Cannot move to ${newPosition.column}${newPosition.row} because it contains a piece of the same color`);
            return false;
        }
        return true;
    }

    getPath(piecePosition, newPosition) {
        const { row: oldRow, column: oldColumn } = piecePosition;
        const { row: newRow, column: newColumn } = newPosition;

        const rowDiff = newRow - oldRow;
        const colDiff = newColumn - oldColumn;

        if (colDiff === 0) {
            for (let i = 1; i < Math.abs(rowDiff); i++) {
                const row = oldRow + i * Math.sign(rowDiff);
                if (board.pieces[row - 1][oldColumn - 1]) {
                    console.log(`Piece in the way at ${oldColumn}${row}`);
                    return false;
                }
            }
        }

        if (rowDiff === 0) {
            for (let i = 1; i < Math.abs(colDiff); i++) {
                const column = oldColumn + i * Math.sign(colDiff);
                if (board.pieces[oldRow - 1][column - 1]) {
                    console.log(`Piece in the way at ${column}${oldRow}`);
                    return false;
                }
            }
        }

        if (Math.abs(rowDiff) === Math.abs(colDiff)) {
            for (let i = 1; i < Math.abs(rowDiff); i++) {
                const testRow = oldRow + i * Math.sign(rowDiff);
                const testColumn = oldColumn + i * Math.sign(colDiff);
                if (board.pieces[testRow - 1][testColumn - 1]) {
                    console.log(`Piece in the way at ${testColumn}${testRow}`);
                    return false;
                }
            }
        }
        return true;
    }
}

class Pawn extends Piece {
    constructor(currentPosition, teamColor) {
        super(currentPosition, teamColor);
        this.unicodeChar = this.teamColor === 'white' ? '\u2659' : '\u265F';
    }

    isValidMove(newPosition) {
        const currentRow = this.currentPosition.row;
        const currentColumn = this.currentPosition.column;
        const newRow = newPosition.row;
        const newColumn = newPosition.column;
        const direction = this.teamColor === 'white' ? -1 : 1;

        if (newColumn === currentColumn && newRow === currentRow + direction) {
            if (board.pieces[newRow - 1][newColumn - 1] instanceof King) {
                console.log('Pawn cannot capture the king');
                return false;
            }
            return true;
        }

        if ((this.teamColor === 'white' && currentRow === 7) || (this.teamColor === 'black' && currentRow === 2)) {
            if (newColumn === currentColumn && newRow === currentRow + 2 * direction) {
                if (board.pieces[newRow - 1][newColumn - 1] instanceof King) {
                    console.log('Pawn cannot capture the king');
                    return false;
                }
                return true;
            }
        }

        if (Math.abs(newColumn - currentColumn) === 1 && newRow === currentRow + direction) {
            if (!board.pieces[newRow - 1][newColumn - 1]) {
                console.log('Pawn cannot capture empty square');
                return false;
            }
            return true;
        }

        return false;
    }

    canAttack(position) {
        const currentRow = this.currentPosition.row;
        const currentColumn = this.currentPosition.column;
        const targetRow = position.row;
        const targetColumn = position.column;
        const direction = this.teamColor === 'white' ? -1 : 1;

        return Math.abs(currentColumn - targetColumn) === 1 && targetRow === currentRow + direction;
    }
}

class Rook extends Piece {
    constructor(currentPosition, teamColor) {
        super(currentPosition, teamColor);
        this.unicodeChar = this.teamColor === 'white' ? '\u2656' : '\u265C';
    }

    isValidMove(newPosition) {
        const currentRow = this.currentPosition.row;
        const currentColumn = this.currentPosition.column;
        const newRow = newPosition.row;
        const newColumn = newPosition.column;

        if (!this.getPath(this.currentPosition, newPosition)) {
            return false;
        }

        if (board.pieces[newRow - 1][newColumn - 1] && board.pieces[newRow - 1][newColumn - 1].teamColor === this.teamColor) {
            return false;
        }

        return newRow === currentRow || newColumn === currentColumn;
    }

    canAttack(position) {
        if (!this.getPath(this.currentPosition, position)) {
            return false;
        }

        const currentRow = this.currentPosition.row;
        const currentColumn = this.currentPosition.column;
        const targetRow = position.row;
        const targetColumn = position.column;

        return targetRow === currentRow || targetColumn === currentColumn;
    }
}

class Knight extends Piece {
    constructor(currentPosition, teamColor) {
        super(currentPosition, teamColor);
        this.unicodeChar = this.teamColor === 'white' ? '\u2658' : '\u265E';
    }

    isValidMove(newPosition) {
        const currentRow = this.currentPosition.row;
        const currentColumn = this.currentPosition.column;
        const newRow = newPosition.row;
        const newColumn = newPosition.column;
        const rowDiff = Math.abs(newRow - currentRow);
        const colDiff = Math.abs(newColumn - currentColumn);

        if (board.pieces[newRow - 1][newColumn - 1] && board.pieces[newRow - 1][newColumn - 1].teamColor === this.teamColor) {
            return false;
        }

        return (rowDiff === 1 && colDiff === 2) || (rowDiff === 2 && colDiff === 1);
    }

    canAttack(position) {
        const currentRow = this.currentPosition.row;
        const currentColumn = this.currentPosition.column;
        const targetRow = position.row;
        const targetColumn = position.column;
        const rowDiff = Math.abs(targetRow - currentRow);
        const colDiff = Math.abs(targetColumn - currentColumn);

        return (rowDiff === 1 && colDiff === 2) || (rowDiff === 2 && colDiff === 1);
    }
}

class Bishop extends Piece {
    constructor(currentPosition, teamColor) {
        super(currentPosition, teamColor);
        this.unicodeChar = this.teamColor === 'white' ? '\u2657' : '\u265D';
    }

    isValidMove(newPosition) {
        const currentRow = this.currentPosition.row;
        const currentColumn = this.currentPosition.column;
        const newRow = newPosition.row;
        const newColumn = newPosition.column;

        if (!this.getPath(this.currentPosition, newPosition)) {
            return false;
        }

        if (board.pieces[newRow - 1][newColumn - 1] && board.pieces[newRow - 1][newColumn - 1].teamColor === this.teamColor) {
            return false;
        }

        const rowDiff = Math.abs(newRow - currentRow);
        const colDiff = Math.abs(newColumn - currentColumn);

        return rowDiff === colDiff;
    }

    canAttack(position) {
        if (!this.getPath(this.currentPosition, position)) {
            return false;
        }

        const currentRow = this.currentPosition.row;
        const currentColumn = this.currentPosition.column;
        const targetRow = position.row;
        const targetColumn = position.column;
        const rowDiff = Math.abs(targetRow - currentRow);
        const colDiff = Math.abs(targetColumn - currentColumn);

        return rowDiff === colDiff;
    }
}

class Queen extends Piece {
    constructor(currentPosition, teamColor) {
        super(currentPosition, teamColor);
        this.unicodeChar = this.teamColor === 'white' ? '\u2655' : '\u265B';
    }

    isValidMove(newPosition) {
        const rookMove = new Rook(this.currentPosition, this.teamColor).isValidMove(newPosition);
        const bishopMove = new Bishop(this.currentPosition, this.teamColor).isValidMove(newPosition);

        if (rookMove || bishopMove) {
            return true;
        }

        if (board.pieces[newPosition.row - 1][newPosition.column - 1] && board.pieces[newPosition.row - 1][newPosition.column - 1].teamColor === this.teamColor) {
            return false;
        }

        return false;
    }

    canAttack(position) {
        const rookAttack = new Rook(this.currentPosition, this.teamColor).canAttack(position);
        const bishopAttack = new Bishop(this.currentPosition, this.teamColor).canAttack(position);

        return rookAttack || bishopAttack;
    }
}

class King extends Piece {
    constructor(currentPosition, teamColor) {
        super(currentPosition, teamColor);
        this.unicodeChar = this.teamColor === 'white' ? '\u2654' : '\u265A';
    }

    isValidMove(newPosition) {
        const currentRow = this.currentPosition.row;
        const currentColumn = this.currentPosition.column;
        const newRow = newPosition.row;
        const newColumn = newPosition.column;

        if (board.pieces[newRow - 1][newColumn - 1] && board.pieces[newRow - 1][newColumn - 1].teamColor === this.teamColor) {
            return false;
        }

        const rowDiff = Math.abs(newRow - currentRow);
        const colDiff = Math.abs(newColumn - currentColumn);

        return rowDiff <= 1 && colDiff <= 1;
    }

    canAttack(position) {
        const currentRow = this.currentPosition.row;
        const currentColumn = this.currentPosition.column;
        const targetRow = position.row;
        const targetColumn = position.column;
        const rowDiff = Math.abs(targetRow - currentRow);
        const colDiff = Math.abs(targetColumn - currentColumn);

        return rowDiff <= 1 && colDiff <= 1;
    }

    isInCheck() {
        for (let row = 1; row <= 8; row++) {
            for (let column = 1; column <= 8; column++) {
                const piece = board.pieces[row - 1][column - 1];
                if (piece && piece.teamColor !== this.teamColor) {
                    const kingPosition = this.currentPosition;

                    if (piece.canAttack(kingPosition)) {
                        console.log(`King is in check by ${piece.constructor.name} at ${column}${row}`);
                        return true;
                    }
                }
            }
        }
        console.log(`${this.teamColor} king is not in check`);
        return false;
    }

    isInCheckParameters(kingPosition) {
        for (let row = 1; row <= 8; row++) {
            for (let column = 1; column <= 8; column++) {
                const piece = board.pieces[row - 1][column - 1];
                if (piece && piece.teamColor !== this.teamColor) {
                    if (piece.canAttack(kingPosition)) {
                        console.log(`King is in check by ${piece.constructor.name} at ${column}${row}`);
                        return true;
                    }
                }
            }
        }
        console.log(`${this.teamColor} king is not in check`);
        return false;
    }

    canKingEscape(kingPosition) {
        // findKing function
        const whiteKingPosition = kingPosition;

        const currentRow = this.currentPosition.row;
        const currentColumn = this.currentPosition.column;

        for (let row = currentRow - 1; row <= currentRow + 1; row++) {
            for (let column = currentColumn - 1; column <= currentColumn + 1; column++) {
                if (row > 0 && row <= 8 && column > 0 && column <= 8) {
                    const newPosition = { row, column };
                    whiteKing.currentPosition = newPosition;
                    if (this.isValidMove(newPosition) && !finalKingCheck(whiteKing)) {
                        console.log(`King can escape to ${column}${row}`);
                        whiteKing.currentPosition = whiteKingPosition;
                        return true;
                    }
                }
            }
        }
        whiteKing.currentPosition = whiteKingPosition;
        console.log('King cannot escape, checkmate');
        endGame(winningTeam);
        return false;
    }
}
