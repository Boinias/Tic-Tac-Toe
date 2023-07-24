
let player1
let player2
let player1Score = 0
let player2Score = 0
let player1ScoreTally = document.getElementById('player1Score')
let player2ScoreTally = document.getElementById('player2Score')
let playerTurnCounter = 0
let player1Marker = 0
let popUp = document.getElementById('popUp')
let dimBg = document.getElementById("dimBg")
let squares = document.getElementById('squares')
let whosGo = document.getElementById('whosGo')
let roundWinner = document.getElementById('roundWinner')
let winner = document.getElementById('winner')
let nextRoundBtn = document.getElementById('nextRoundBtn')
let restartBtn = document.querySelectorAll('.restart')
let title = document.getElementById('title')
let nameGame = document.getElementById('startGame')



restartBtn.forEach(function(restartBtn) {
    restartBtn.addEventListener('click', () => {
    gamePlay.restart()
    nameGame.style.display = 'block';
})});

nextRoundBtn.addEventListener('click', () => {
    for (let i = 0; i < 9;i++) {
        let square = document.getElementById(`${i}`)
        gameBoard.board[i] = '';
        square.textContent = '';
    }
    whosGo.textContent = `${player1.name}'s turn`;
    popUp.style.display = 'none';
    dimBg.style.display = 'none';
});




const gameBoard = (function () {
 let board = ["", "", "", "", "", "", "", "", ""]

 function displayMarkers () {
    for (let i=0; i < 9; i++) {
        let square = document.getElementById(`${i}`)
        if (board[i] == "") {
            square.textContent = ""
        } else if (board[i] == "x") {
            square.textContent = "x"
        } else if (board[i] == "o") {
            square.textContent = "o"
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

    function winner () {
        for (let i = 0; i < 8; i++) {
            let winningPattern = winningPatterns[i]
            const [a, b, c] = winningPattern
            if (board[a] === `${player1.marker}` && board[b] === `${player1.marker}` && board[c] === `${player1.marker}`) {
                player1.score++
                playerTurnCounter = player1Marker
                player1ScoreTally.textContent = player1.score.toString()
                if (player1.score < 3) {
                    stage2.style.display = 'none'
                    stage3.style.display = 'block'
                    popUp.style.display = 'block'
                    dimBg.style.display = "flex";
                    roundWinner.textContent = `${player1.name} wins`
                }
                else if (player1.score === 3) {
                    gamePlay.gameOver ()
                    stage3.style.display = 'none'
                    stage4.style.display = 'block'
                    popUp.style.display = 'block'
                    dimBg.style.display = "flex";
                    winner.textContent = `${player1.name} is the winner!`
                }
                console.log("p1 wins")
                
            } else if (board[a] === `${player2.marker}` && board[b] === `${player2.marker}` && board[c] === `${player2.marker}`) {
                player2.score++
                playerTurnCounter = player1Marker
                player2ScoreTally.textContent = player2.score.toString()
                if (player2.score < 3) {
                    stage2.style.display = 'none'
                    stage3.style.display = 'block'
                    popUp.style.display = 'block'
                    dimBg.style.display = "flex";
                    roundWinner.textContent = `${player2.name} wins this round`
                } else if(player2.score === 3) {
                    gamePlay.gameOver ()
                    stage3.style.display = 'none'
                    stage4.style.display = 'block'
                    popUp.style.display = 'block'
                    dimBg.style.display = "flex";
                    winner.textContent = `${player2.name} is the winner!`;
                }
                console.log("p2 wins")
            } else if (board.every((square) => square !== '')) {
                stage2.style.display = 'none'
                stage3.style.display = 'block'
                popUp.style.display = 'block'
                dimBg.style.display = "flex";
                roundWinner.textContent = 'draw';
            }
    }}


 return {
    board,
    displayMarkers,
    winner
 }
}) ();




const gamePlay = (function () {
    document.getElementById('startGame').addEventListener('click', () => {
        popUp.style.display = "block";
        dimBg.style.display = "flex";
    })

    function PlayerFactory (name, score, marker) {
        return {
            name: name,
            score: score,
            marker: marker
        }
    }

    //Player names form submission
    const form = document.querySelector("form")
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        let fullName1 = document.getElementById('fullName1').value
        let fullName2 = document.getElementById('fullName2').value
        let stage1 = document.getElementById('stage1')
        let stage2 = document.getElementById('stage2')
        player1 = PlayerFactory (fullName1, 0)
        player2 = PlayerFactory (fullName2, 0)
        stage1.style.display = 'none'
        stage2.style.display = 'block'
        console.log(player1)
        title.textContent = `${player1.name} choose your marker!`

})


    //Assigning X/O to player1/player2
    let x = document.getElementById('x');
    x.addEventListener('click', () => {
        player1Marker = 2
        playerTurnCounter = 2
        popUp.style.display = 'none'
        squares.style.display = 'grid'
        dimBg.style.display = "none";
        player1.marker = 'x'
        player2.marker = 'o'
        newGame.style.display = "none";
    })

    let o = document.getElementById('o');
    o.addEventListener('click', () => {
        player1Marker = 1
        playerTurnCounter = 1
        popUp.style.display = 'none'
        squares.style.display = 'grid'
        dimBg.style.display = "none";
        player1.marker = 'o'
        player2.marker = 'x'
        newGame.style.display = "none";
    })

    function updateMarking (e, marking) {
        e.target.textContent = marking;
        gameBoard.board[e.target.id] = marking;
        playerTurnCounter++;
    }

    function cannotPlaceMarker (e) {
        e.target.style.backgroundColor = 'red';
        setTimeout(function() {
          e.target.style.backgroundColor = 'antiquewhite';
        }, 100);
    }


    //logic to place markers down on each square and check for a winner each time
    let eachSquare = document.getElementsByClassName('square')
    for (let i = 0; i < 9; i++) {
        eachSquare[i].addEventListener('click', (e) => {
          if (playerTurnCounter % 2 === 0) {
            if (e.target.textContent === '') {
              updateMarking(e, 'x')
              gameBoard.winner()
              whosGo.textContent = `${player2.name}'s turn`;
            } else if (e.target.textContent === 'x' || e.target.textContent === 'o') {
                cannotPlaceMarker (e)
            }

          } else if (playerTurnCounter % 2 === 1) {
            if (e.target.textContent === '') {
                updateMarking(e, 'o')
                gameBoard.winner()
              whosGo.textContent = `${player1.name}'s turn`;
            } else if (e.target.textContent === 'x' || e.target.textContent === 'o') {
                cannotPlaceMarker (e)
            }
          }
          console.log(gameBoard);
        });
      };


      //Display menu once game is complete

      function restart () {
        for (let i = 0; i < 9;i++) {
            let square = document.getElementById(`${i}`)
            gameBoard.board[i] = '';
            square.textContent = '';
        }
            whosGo.textContent = '';
            squares.style.display = 'none';
            popUp.style.display = "none";
            dimBg.style.display = "none";
            stage3.style.display = "none";
            stage4.style.display = "none";
            stage1.style.display = "block";
            nameGame.style.display = 'block';
            player1Score = 0;
            player2Score = 0;
            player1ScoreTally.textContent = '';
            player2ScoreTally.textContent = '';
            player1.name = ''
            player2.name = ''
      }
    

      function gameOver () {
        restart()
      }

      return {
        gameOver,
        restart
      }

}) ();



// to do list
// dimBg on click reset and esc popUp
// form validation so ppl have to input at least one letter and not a number
// make heading htat tells users it's first to three