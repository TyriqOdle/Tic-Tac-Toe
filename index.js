const gameBoard = document.querySelector(".game-board")

const Player = (name,marker) =>{
    return {name, marker}
}


const GameBoard = (() =>{
    let board = ["", "", "", "", "","","","",""]
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
        createBoard()
    };

    const clearBoard = () =>{
        gameBoard.innerHTML = "";
    };


    //Exporting
    return {
        board,
        createBoard,
        resetBoard,
        clearBoard,
        updateBoard
    }
})();

const GameController = (() =>{
    const playerOne = Player("Jim","X")
    const playerTwo = Player("Bob", "O")

    let currentPlayer = playerOne
    let gameWon = false
    let round = 0



    const startRound = () =>{
        let turnText = document.querySelector(".turn")
        turnText.textContent = `${currentPlayer.name}'s Turn`
    };

    const playRound = (index) =>{
        round ++
        console.log(`ROUND ${round}`)
       GameBoard.board[index] = currentPlayer.marker
       const winner = checkWinner(GameBoard.board)
       GameBoard.updateBoard(index)
        if(winner == null && round == 9){
            displayController.displayWinner("Draw")
        }else if(winner === null){
            switchPlayers()
            startRound()
        }else{
            displayController.displayWinner(winner)
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
        getGameWon
    }

})();

const displayController = (() =>{
    let turnText = document.querySelector(".turn")
    
    const displayWinner = (winner) =>{
        if(winner == "Draw"){
            turnText.textContent = `${winner}!!`
        }else{
            turnText.textContent = `${winner} WON!!`
        }
        
    }

    //Export

    return {
        displayWinner
    }
})();


GameBoard.createBoard();
GameController.startRound();








