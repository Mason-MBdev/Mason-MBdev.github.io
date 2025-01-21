// -------------------------------
// ** FIREBASE CONFIG ** 
// -------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, doc, onSnapshot, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBz9ucdMV7rIpEid4PoUFZ-7RcX3mKFMWg",
    authDomain: "chess-bfb04.firebaseapp.com",
    projectId: "chess-bfb04",
    storageBucket: "chess-bfb04.firebasestorage.app",
    messagingSenderId: "771678275960",
    appId: "1:771678275960:web:4f6634d804e0c890e5a08d",
    measurementId: "G-HK1HY6M261"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// -------------------------------
// ** DOM CONTENT INIT ** 
// -------------------------------

document.addEventListener('DOMContentLoaded', async () => {
    const game = new Chess();
    console.log(game);
    const board = Chessboard('board', {
        position: 'start',
        draggable: true,
        onDrop: handleMove,
        onDragStart: onDragStart,
    });
    var $board = $('#board')
    var squareToHighlight = null
    var squareClass = 'square-55d63'
    $(window).resize(board.resize)

    let gameId = null;
    let playerColor = null;
    let gameRef = null;
    let chatRef = null;

    // initialization buttons
    const joinInput = document.getElementById('join-id-input');
    const joinPwInput = document.getElementById('join-pw-input');
    const joinButton = document.getElementById('join-send');
    const hostPwInput = document.getElementById('host-pw-input');
    const hostButton = document.getElementById('host-send');
    const reloadButton = document.getElementById('reload-button');
    
    // sidebar elements
    const chatMessages = document.getElementById('chat-messages')
    const moveList = document.getElementById('move-list');
    const gameIDElement = document.getElementById('game-id');

    // meta UI state management
    const UIBeforeGame = document.querySelectorAll('.beforegame');
    const UIDuringGame = document.querySelectorAll('.duringgame');
    const UIAfterGame = document.querySelectorAll('.aftergame');

    // -------------------------------
    // ** UI AND GAME FLOW MANAGEMENT ** 
    // -------------------------------

    hostButton.addEventListener('click', async () => {
        const hostPassword = hostPwInput.value.trim();
        if (!hostPassword) {
            alert('Please enter a password to host the game.');
            return;
        }

        gameId = Math.random().toString(36).substr(2, 9);
        gameIDElement.innerHTML = gameId;
        gameRef = doc(db, 'games', gameId);

        await setDoc(gameRef, {
            moves: [],
            turn: 'w',
            players: { host: hostPassword, join: null },
            gameOver: false,
            messages: []
        });

        playerColor = 'w';
        setupSnapshotListener();
        UIBeforeGame.forEach(item => item.style.display = 'none');
        UIDuringGame.forEach(item => item.style.display = 'block');
        UIAfterGame.forEach(item => item.style.display = 'none');
    });

    joinButton.addEventListener('click', async () => {
        const joinId = joinInput.value.trim();
        const joinPassword = joinPwInput.value.trim();

        if (!joinId || !joinPassword) {
            alert('Please enter the Game ID and password.');
            return;
        }

        gameRef = doc(db, 'games', joinId);
        const gameSnapshot = await getDoc(gameRef);

        if (!gameSnapshot.exists()) {
            alert('Game not found!');
            return;
        }

        const gameData = gameSnapshot.data();
        if (gameData.players.join) {
            alert('Game is already full!');
            return;
        }

        if (gameData.players.host !== joinPassword) {
            alert('Incorrect password!');
            return;
        }

        gameId = joinId;
        playerColor = 'b';
        gameIDElement.innerHTML = joinId;

        await updateDoc(gameRef, {
            'players.join': 'joined'
        });

        setupSnapshotListener();
        UIBeforeGame.forEach(item => item.style.display = 'none');
        UIDuringGame.forEach(item => item.style.display = 'block');
        UIAfterGame.forEach(item => item.style.display = 'none');
    });

    reloadButton.addEventListener('click', () => {
        location.reload();
    });

    // -------------------------------
    // ** FIREBASE SHARED GAME STATE MANAGEMENT ** 
    // -------------------------------

    async function updateGameState(state) {
        if (gameRef) {
            await updateDoc(gameRef, state);
        }
    }

    function setupSnapshotListener() {
        if (!gameRef) {
            console.error('Game reference not set.');
            return;
        }

        onSnapshot(gameRef, (doc) => {
            if (doc.exists()) {
                console.log('Snapshot triggered:', doc.data());
                const data = doc.data();
                const moves = data.moves || [];

                game.reset();
                moves.forEach((move) => game.move(move));
                board.position(game.fen());

                const turnDisplay = document.getElementById('turn');
                if (turnDisplay) {
                    turnDisplay.innerText = data.turn === 'w' ? 'White' : 'Black';
                }
                
                chatMessages.innerHTML = '';

                data.messages.forEach((message) => {
                    const li = document.createElement('li');
                    li.className = message.sender;
                    li.textContent = `${message.sender === 'w' ? 'White' : 'Black'}: ${message.text}`;
                    chatMessages.appendChild(li);
                });
                
                const chatWindow = document.getElementById('chat-window');
                chatWindow.scrollTop = chatWindow.scrollHeight;

                if (data.gameOver == true) {
                    UIBeforeGame.forEach(item => item.style.display = 'none');
                    UIDuringGame.forEach(item => item.style.display = 'none');
                    UIAfterGame.forEach(item => item.style.display = 'block');

                    if (data.gameWinner) {
                        if (data.gameWinner === playerColor) {
                            document.getElementById('winner-output').style.display = 'block';
                        } else {
                            document.getElementById('loser-output').style.display = 'block';
                        }
                    } else {
                        document.getElementById('draw-output').style.display = 'block';
                    }
                }
            } else {
                console.error('Document does not exist.');
            }
        });
    }

    // -------------------------------
    // ** CHESSBOARD INTERACTION ** 
    // -------------------------------

    async function handleMove(source, target) {
        removeHighlights('black');
        removeHighlights('white');

        if (game.turn() !== playerColor) return 'snapback';

        const move = game.move({ from: source, to: target, promotion: 'q' });
        if (move === null) {
            alert('Illegal move, move the piece back to its original position.');
            return 'snapback';
        }

        // Determine game state and message
        let gameOver = false;
        let gameWinner = null;

        if (game.in_checkmate()) {
            gameOver = true;
            gameWinner = playerColor;
        } else if (game.in_draw()) {
            gameOver = true;
        } else if (game.in_stalemate()) {
            gameOver = true;
        }

        // Update the game state
        await updateGameState({
            moves: game.history(),
            turn: game.turn(),
            gameOver,
            gameWinner
        });
    }

    function onDragStart(source, piece, position, orientation) {
        removeHighlights('black');
        removeHighlights('white');

        if (
            (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)
        ) {
            return false;
        }

        var legalMoves = game.moves({
            square: source,
            verbose: true,
        });

        legalMoves.forEach((move) => {
            $board.find('.square-' + move.to).addClass('highlight-legal');
        });
    }

    // -------------------------------
    // ** UTILITY FUNCTIONS ** 
    // -------------------------------

    function removeHighlights(color) {
        $board.find('.' + squareClass).removeClass('highlight-' + color);
        $board.find('.' + squareClass).removeClass('highlight-legal');
    }

    document.getElementById('chat-send').addEventListener('click', async () => {
        const input = document.getElementById('message-input');
        const messageText = input.value.trim();
        if (messageText) {
            const message = {
                sender: playerColor,
                text: messageText
            };

            const gameSnapshot = await getDoc(gameRef);
            const data = gameSnapshot.data();

            await updateDoc(gameRef, {
                messages: [...data.messages, message]
            });

            input.value = '';
        }
    });
});