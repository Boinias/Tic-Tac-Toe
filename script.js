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

 return {
    board,
    displayMarkers
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

    let eachSquare = document.getElementsByClassName('square')
    for (i=0; i<9; i++) {
        eachSquare[i].addEventListener('click', (e) => {
            if (whosGo.textContent == 'x' || whosGo.textContent == 'o') {
                null
            } else if (playerTurnCounter % 2 === 0) {
                whosGo.textContent = `${player2.name}'s turn`;
                if (e.target.textContent = '') {
                    e.target.textContent = 'x'
                } else if (e.target.textContent = 'x') {
                    e.target.textContent = 'x'
                } else if (e.target.textContent = 'o') {

                }
                gameBoard.board[e.target.id] = 'x';
                console.log(gameBoard)
            } else if (playerTurnCounter % 2 === 1) {
                whosGo.textContent = `${player2.name}'s turn`;
                e.target.textContent = 'o';
                gameBoard.board[e.target.id] = 'o';
                console.log(gameBoard)
                playerTurnCounter++
            }
        })
    }

}) ();