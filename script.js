let gameBoard = ["*", "*", "*", "*", "*", "*", "*", "*", "*"];
let currentPlayer = null;
let cellId = null;

function displayBoard(gameBoard) {
    console.log("--------------");
    console.log("| " + gameBoard[0] + " | " + gameBoard[1] + " | " + gameBoard[2] + " |");
    console.log("-------------");
    console.log("| " + gameBoard[3] + " | " + gameBoard[4] + " | " + gameBoard[5] + " |");
    console.log("-------------");
    console.log("| " + gameBoard[6] + " | " + gameBoard[7] + " | " + gameBoard[8] + " |");
    console.log("-------------");
}

function selectSymbol(playerName, symbol) {
    return { playerName, symbol };
}

function checkWin(gameBoard, player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    for (let condition of winConditions) {
        if (gameBoard[condition[0]] === player.symbol &&
            gameBoard[condition[1]] === player.symbol &&
            gameBoard[condition[2]] === player.symbol) {
            console.log(`${player.playerName} wins!`);
            document.getElementById('status').value = player.playerName + " wins!";
            return true;
        } else {
            return false;
        }
    };

    const resetBoard = () => {
        board.fill('');
    };

    return {
        board,
        updateBoard,
        resetBoard
    };
})();

const player = (name, marker) => {
    return {
        name,
        marker
    };
};