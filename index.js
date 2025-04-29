const gameBoard = document.querySelector(".game-board")
const gameContainer = document.querySelector(".container")
const startOverlay = document.querySelector(".modal-overlay")

const Player = (name,marker) =>{
    return {name, marker}
};

const getStartData = (() =>{
    const form = document.querySelector("#player-names-form")

    form.addEventListener("submit",(e) =>{
        const formData = new FormData(form)
        e.preventDefault()

        let player1 = formData.get("playerX")
        let player2 = formData.get("playerO")

        createPlayer(player1, player2)
        
        form.reset()  
        //Hides start menu and shows game container
        startOverlay.style.display = "none"
        gameContainer.style.display = "block"

        //Starts Game
        GameBoard.createBoard();
        GameController.startRound();

    })

});

const createPlayer = ((name1, name2)=>{
        let playerOne = Player(name1,"X")
        let playerTwo = Player(name2, "O")
        GameController.setPlayers(playerOne,playerTwo)
});

const GameBoard = (() =>{
    let board = []
    let clickedIndex

    const createBoard = () => {
        for(let i = 0; i < 9; i++){
            let cell = document.createElement("div")
            cell.setAttribute("class","cell")
            cell.textContent = board[i]
            cell.setAttribute("data-id",i)

            //Event listener for when the board is clicked.
            cell.addEventListener("click", (e) =>{
                const clickedIndex = e.target.dataset.id
                console.log(`ID for clickeced ${e.target.dataset.id}`)
                GameController.playRound(clickedIndex)
                e.target.style.pointerEvents = "none";

                //Checks to see if he game has been won and prevents more clicks
                if (GameController.getGameWon()) {
                    gameBoard.style.pointerEvents = "none";
                }
            })

            gameBoard.appendChild(cell);
        }
    };

    const updateBoard = (clickedIndex) => {
        const currentMarker = GameController.getCurrentPlayer().marker;
        console.log(currentMarker)
        console.log(clickedIndex)

        // Get the cell that was clicked
        const oldCell = document.querySelector(`[data-id="${clickedIndex}"]`);

        // Update the existing cell
        oldCell.textContent = currentMarker;
        oldCell.classList.add(currentMarker);
        
        // Prevent further clicks after placing
        oldCell.style.pointerEvents = "none";
        
    };

    const resetBoard = () =>{
        gameBoard.innerHTML = "";
        board.splice(0,9)
        createBoard()
    };

    //Exporting
    return {
        board,
        createBoard,
        resetBoard,
        updateBoard
    }
})();

const GameController = (() =>{
   
    let gameWon = false
    let round = 0
    let winnerName

    const setPlayers = (p1, p2) => {
        playerOne = p1;
        playerTwo = p2;
        currentPlayer = playerOne; 
    };
    const newGame = () =>{
        gameWon = false
        round = 0
        gameBoard.style.pointerEvents = "auto";
        currentPlayer = playerOne
        startRound();
    };

    const startRound = () =>{
        let turnText = document.querySelector(".turn")
        turnText.textContent = `${currentPlayer.name}'s Turn`
    };

    const playRound = (index) =>{
        round ++
       GameBoard.board[index] = currentPlayer.marker
       const winner = checkWinner(GameBoard.board)
       GameBoard.updateBoard(index)
        if(winner == null && round == 9){
            displayController.displayWinner("Draw")
        }else if(winner === null){
            switchPlayers()
            startRound()
        }else{
            if(playerOne.marker == winner){
                winnerName = playerOne.name
           }else if(playerTwo.marker == winner){
                winnerName = playerTwo.name
           }else{
                winnerName = "Draw"
           }
            displayController.displayWinner(winnerName)
            gameWon = true
        }

    };

    const switchPlayers = () =>{
        if(currentPlayer == playerOne){
            currentPlayer = playerTwo
        }else{
            currentPlayer = playerOne
        }
    };

    const checkWinner = (board) =>{
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
          ];

          for(let combo of winCombos){
            const [a,b,c] = combo
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; 
            }

          }
        return null; // No winner
    };

    const getWinner =  () => winner;

    const getCurrentPlayer = () => currentPlayer;

    const getGameWon = () => gameWon;

    

    //Export
    return {
        startRound,
        playRound,
        getCurrentPlayer,
        getGameWon,
        newGame,
        setPlayers
    }

})();

const displayController = (() =>{
    let turnText = document.querySelector(".turn")
    
    const displayWinner = (winnerName) =>{
        
        gameContainer.style.display = "none"
        let resultScreen = document.querySelector(".result-overlay")
        let resultMessage = document.querySelector("#result-message")
        let playAgainBtm = document.querySelector("#play-again-btn")
        resultScreen.style.display = "flex"
        resultMessage.textContent = `${winnerName} Wins!`

        playAgainBtm.addEventListener("click",()=>{
            resultScreen.style.display ="none"
            gameContainer.style.display = "block"


            GameBoard.resetBoard()
            GameController.newGame()
        })



        
    }

    //Export

    return {
        displayWinner
    }
})();

const newGame = (() =>{
    const newGameBtn = document.querySelector("#reset-btn")
    newGameBtn.addEventListener("click", () =>{
        GameBoard.resetBoard()
        GameController.newGame()
    })
})();


const gameFlow = (() =>{
    getStartData()
    
})();









