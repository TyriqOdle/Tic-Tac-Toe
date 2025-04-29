const gameBoard = document.querySelector(".game-board")

const Player = (name,marker) =>{
    return {name, marker}
}


const GameBoard = (() =>{
    let board = ["", "", "", "", "","","","",""]

    const createBoard = () => {
        for(let i = 0; i < 9; i++){
            let cell = document.createElement("div")
            cell.setAttribute("class","cell")
           
            cell.textContent = board[i]
            cell.setAttribute("data-id",i)

            //Event listener for when the board is clicked.
            cell.addEventListener("click", (e) =>{
                const index = e.target.dataset.id
                GameController.playRound(index)
            })

            gameBoard.appendChild(cell);
        }
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
        clearBoard
    }
})();

const GameController = (() =>{
    const playerOne = Player("Jim","X")
    const playerTwo = Player("Bob", "O")

    let currentPlayer = playerOne
    let gameWon = false



    const startRound = () =>{
        let turnText = document.querySelector(".turn")
        turnText.textContent = `${currentPlayer.name}'s Turn`
    };

    const playRound = (index) =>{
       GameBoard.board[index] = currentPlayer.marker
       const winner = checkWinner(GameBoard.board)
       GameBoard.clearBoard()
       GameBoard.createBoard()
        if(winner === null){
            switchPlayers()
            startRound()
        }else{
            console.log(`Winner is ${winner}`)
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

    

    //Export
    return {
        startRound,
        playRound,
        currentPlayer,
        gameWon,
        
        
    }

})();

const displayController = (() =>{
    let turnText = document.querySelector(".turn")
    
    const displayWinner = (winner) =>{
        turnText.textContent = `${winner} WON!!`
    }

    //Export

    return {
        displayWinner
    }
})();

GameBoard.createBoard()
GameController.startRound()







