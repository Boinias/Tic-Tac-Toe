//global JS variables
let player1;
let player2;
let player1Score = 0;
let player2Score = 0;
let playerTurnCounter = 0;
let player1Marker = 0;
//global DOM elements
let player1ScoreTally = document.getElementById('player1Score');
player1ScoreTally.textContent = '0';
let player2ScoreTally = document.getElementById('player2Score');
player2ScoreTally.textContent = '0';
let popUp = document.getElementById('popUp');
let dimBg = document.getElementById("dimBg");
let squares = document.getElementById('squares');
let whosGo = document.getElementById('whosGo');
let roundWinner = document.getElementById('roundWinner');
let winner = document.getElementById('winner');
let nextRoundBtn = document.getElementById('nextRoundBtn');
let restartBtn = document.querySelectorAll('.restart');
let title = document.getElementById('title');
let newGame = document.getElementById('startGame');
let scores = document.getElementById('scores');
let bottom = document.getElementById('bottom');
let p1name = document.getElementById('p1name');
let p2name = document.getElementById('p2name');
let stage3 = document.getElementById('stage3');
let stage4 = document.getElementById('stage4');


//------------------------------------------------------------------------------


restartBtn.forEach(function(restartBtn) {
    restartBtn.addEventListener('click', () => {
    gamePlay.restart();
    newGame.style.display = 'block';
})});

nextRoundBtn.addEventListener('click', () => {
    for (let i = 0; i < 9;i++) {
        let square = document.getElementById(`${i}`);
        gameBoard.board[i] = '';
        square.textContent = '';
    }
    whosGo.textContent = `${player1.name}'s turn`;
    popUp.style.display = 'none';
    dimBg.style.display = 'none';
});

function PlayerFactory (name, score, marker) {
    return {
        name: name,
        score: score,
        marker: marker
    }
}



//gameBoard module
const gameBoard = (function () {
 let board = ["", "", "", "", "", "", "", "", ""]

 function displayMarkers () {
    for (let i=0; i < 9; i++) {
        let square = document.getElementById(`${i}`);
        if (board[i] == "") {
            square.textContent = "";
        } else if (board[i] == "x") {
            square.textContent = "x";
        } else if (board[i] == "o") {
            square.textContent = "o";
        }
    }
 }
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];

//checks round and match winner
function matchWinner() {
    const checkWinner = (player, playerName) => {
        if (player.score < 3) {
            popUp.style.display = 'block';
            stage2.style.display = 'none';
            stage3.style.display = 'flex';
            dimBg.style.display = 'flex';
            roundWinner.textContent = `${playerName} wins this round`;
        } else {
            winner.textContent = `${playerName} is the winner!`;
            gamePlay.gameOver();
            stage3.style.display = 'none';
            stage4.style.display = 'block';
            popUp.style.display = 'block';
            dimBg.style.display = 'flex';
        }
    };
    
    for (const pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (board[a] === player1.marker && board[b] === player1.marker && board[c] === player1.marker) {
            player1.score++;
            playerTurnCounter = player1Marker;
            player1ScoreTally.textContent = player1.score.toString();
            checkWinner(player1, player1.name);
        } else if (board[a] === player2.marker && board[b] === player2.marker && board[c] === player2.marker) {
            player2.score++;
            playerTurnCounter = player1Marker;
            player2ScoreTally.textContent = player2.score.toString();
            checkWinner(player2, player2.name);
        }
    }
    
    if (board.every((square) => square !== '')) {
            playerTurnCounter = player1Marker;
            stage2.style.display = 'none';
            stage3.style.display = 'flex';
            popUp.style.display = 'block';
            dimBg.style.display = 'flex';
            roundWinner.textContent = 'draw';
    }
}


 return {
    board,
    displayMarkers,
    matchWinner
 }
}) ();



//gamePlay module
const gamePlay = (function () {
    newGame.addEventListener('click', () => {
    popUp.style.display = "block";
    dimBg.style.display = "flex";
    newGame.style.display = 'none';
});


//player names form submission
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let fullName1 = document.getElementById("fullName1").value;
    let fullName2 = document.getElementById("fullName2").value;
    let stage1 = document.getElementById("stage1");
    let stage2 = document.getElementById("stage2");

    player1 = PlayerFactory(fullName1, 0);
    player2 = PlayerFactory(fullName2, 0);

    stage1.style.display = "none";
    stage2.style.display = "block";
    title.textContent = `${player1.name} choose your marker!`;
    p1name.textContent = `${player1.name} dubs`;
    p2name.textContent = `${player2.name} dubs`;
});


//assigning X/O to player1/player2
function handleMarkerSelection(playerMarker, player1MarkerValue, player2MarkerValue) {
    player1Marker = player1MarkerValue;
    playerTurnCounter = player1MarkerValue;
    popUp.style.display = 'none';
    squares.style.display = 'grid';
    dimBg.style.display = 'none';
    scores.style.display = 'flex';
    player1.marker = playerMarker;
    player2.marker = playerMarker === 'x' ? 'o' : 'x';
    newGame.style.display = 'none';
    bottom.style.display = 'flex';
    whosGo.textContent = `${player1.name}'s turn`;
    whosGo.style.display = 'flex';
}

let x = document.getElementById('x');
x.addEventListener('click', () => {
    handleMarkerSelection('x', 2, 1);
});

let o = document.getElementById('o');
o.addEventListener('click', () => {
    handleMarkerSelection('o', 1, 2);
});

dimBg.addEventListener('click', () => {
    gameOver();
    restart();
});


//updating marker placements on DOM element and array
function updateMarking (e, marking) {
    e.target.textContent = marking;
    gameBoard.board[e.target.id] = marking;
    playerTurnCounter++;
    currentPlayerName = (playerTurnCounter % 2 === 0) ? player2.name : player1.name;
    whosGo.textContent = `${currentPlayerName}'s turn`;
}

function cannotPlaceMarker (e) {
    e.target.style.backgroundColor = 'red';
    setTimeout(function() {
        e.target.style.backgroundColor = 'antiquewhite';
    }, 100);
}


//logic to place markers down on each square and check for a winner each time
let eachSquare = document.getElementsByClassName('square');
for (let i = 0; i < 9; i++) {
    eachSquare[i].addEventListener('click', (e) => {
        if (playerTurnCounter % 2 === 0 && e.target.textContent === '') {
            updateMarking(e, 'x');
            if (player1Marker % 2 === 0) {
                whosGo.textContent = `${player2.name}'s turn`;
            } else if (player1Marker % 2 !== 0) {
                whosGo.textContent = `${player1.name}'s turn`;
            }
            gameBoard.matchWinner();
        

        } else if (playerTurnCounter % 2 === 1 && e.target.textContent === '') {
            updateMarking(e, 'o');
            if (player1Marker % 2 === 1) {
                whosGo.textContent = `${player2.name}'s turn`;
            } else if (player1Marker % 2 !== 1) {
                whosGo.textContent = `${player1.name}'s turn`;
            }
            gameBoard.matchWinner();

        } else if (e.target.textContent === 'x' || e.target.textContent === 'o') {
            cannotPlaceMarker (e);
        }
     });
    };


//restart and game over functions
function restart () {
    for (let i = 0; i < 9;i++) {
        let square = document.getElementById(`${i}`);
        gameBoard.board[i] = '';
        square.textContent = '';
    };
    whosGo.textContent = '';
    whosGo.style.display = 'none';
    squares.style.display = 'none';
    popUp.style.display = "none";
    dimBg.style.display = "none";
    stage3.style.display = "none";
    stage4.style.display = "none";
    stage1.style.display = "block";
    newGame.style.display = 'block';
    player1Score = 0;
    player2Score = 0;
    player1ScoreTally.textContent = player1Score;
    player2ScoreTally.textContent = player1Score;
    player1.name = '';
    player2.name = '';
    player1Marker = '';
}
    
function gameOver () {
    for (let i = 0; i < 9;i++) {
        let square = document.getElementById(`${i}`);
        gameBoard.board[i] = '';
        square.textContent = '';
    };
    whosGo.textContent = '';
    squares.style.display = 'none';
    popUp.style.display = "block";
    dimBg.style.display = "block";
    stage1.style.display = "none";
    stage2.style.display = "none";
    stage3.style.display = "none";
    stage4.style.display = "block";
    player1Score = 0;
    player2Score = 0;
    player1ScoreTally.textContent = player1Score;
    player2ScoreTally.textContent = player1Score;
    player1.name = '';
    player2.name = '';
    player1Marker = '';
    p1name.textContent = '';
    p2name.textContent = '';
    scores.style.display = 'none';
};


return {
    gameOver,
    restart
}

}) ();