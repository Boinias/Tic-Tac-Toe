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
            if (board[a] === 'x' && board[b] === 'x' && board[c] === 'x') {
                console.log("x wins")
            } else if (board[a] === 'o' && board[b] === 'o' && board[c] === 'o') {
                console.log("o wins")
            } else if (board.every((square) => square !== '')) {
                console.log("draw")
            }
    }}


 return {
    board,
    displayMarkers,
    winner
 }
}) ();

let player1
let player2
let playerTurnCounter = 0

const gamePlay = (function () {
    document.getElementById('startGame').addEventListener('click', () => {
        let popUp = document.getElementById("popUp")
        let dimBg = document.getElementById("dimBg")
        popUp.style.display = "block";
        dimBg.style.display = "flex";
    })

    function PlayerFactory (name, score) {
        return {
            name: name,
            score: score
        }
    }

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

})

    let popUp = document.getElementById('popUp')
    let dimBg = document.getElementById("dimBg")
    let squares = document.getElementById('squares')
    let whosGo = document.getElementById('whosGo')

    let x = document.getElementById('x');
    x.addEventListener('click', () => {
        playerTurnCounter = 2
        popUp.style.display = 'none'
        squares.style.display = 'grid'
        dimBg.style.display = "none";
        whosGo.textContent = `${player1.name}'s turn`;
    })

    let o = document.getElementById('o');
    o.addEventListener('click', () => {
        playerTurnCounter = 1
        popUp.style.display = 'none'
        squares.style.display = 'grid'
        dimBg.style.display = "none";
        whosGo.textContent = `${player1.name}'s turn`;
    })

    function updateMarking (e, marking) {
        e.target.textContent = marking;
        gameBoard.board[e.target.id] = marking;
        gameBoard.winner()
        playerTurnCounter++;
    }

    function cannotPlaceMarker (e) {
        e.target.style.backgroundColor = 'red';
        setTimeout(function() {
          e.target.style.backgroundColor = 'antiquewhite';
        }, 1000);
    }

    let eachSquare = document.getElementsByClassName('square')
    for (let i = 0; i < 9; i++) {
        eachSquare[i].addEventListener('click', (e) => {
          if (playerTurnCounter % 2 === 0) {
            if (e.target.textContent === '') {
              updateMarking(e, 'x')
              whosGo.textContent = `${player2.name}'s turn`;
            } else if (e.target.textContent === 'x' || e.target.textContent === 'o') {
                cannotPlaceMarker (e)
            }

          } else if (playerTurnCounter % 2 === 1) {
            if (e.target.textContent === '') {
                updateMarking(e, 'o')
              whosGo.textContent = `${player1.name}'s turn`;
            } else if (e.target.textContent === 'x' || e.target.textContent === 'o') {
                cannotPlaceMarker (e)
            }
          }
          console.log(gameBoard);
        });
      }
    ;

}) ();