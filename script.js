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
        }
    }
    return false;
}

function checkDraw(gameBoard) {
    return gameBoard.every(cell => cell !== '*');
}

function updateGameBoard(index, player) {
    gameBoard[index - 1] = player.symbol;
    displayBoard(gameBoard);
    populateTable();
}

function populateTable() {
    const table = document.getElementById("gameTable");
    const cells = table.getElementsByTagName("td");
    gameBoard.forEach((value, index) => {
        cells[index].textContent = value;
    });
}

function setupTableCellClickHandler() {
    const cells = document.querySelectorAll('#gameTable td');
    cells.forEach(cell => {
        cell.addEventListener('click', function (event) {
            cellId = event.target.id;
        });
    });
}

function playGame() {
    const playerName1 = document.getElementById('player1name').value;
    const symbol = document.getElementById('player1Symbol').value;
    const player1 = selectSymbol(playerName1, symbol);
    const playerName2 = document.getElementById('player2name').value;
    const player2 = symbol === 'O' ? selectSymbol(playerName2, 'X') : selectSymbol(playerName2, 'O');

    displayBoard(gameBoard);
    populateTable();
    setupTableCellClickHandler();

    let gameOver = false;
    let iterations = 1;

    function takeTurn() {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (cellId) {
                    clearInterval(interval);
                    resolve(cellId);
                }
            }, 100);
        });
    }

    async function gameLoop() {
        while (!gameOver) {
            document.getElementById('turn').value = player1.playerName + "'s turn";
            let player1Index = await takeTurn();
            updateGameBoard(player1Index, player1);
            if (checkWin(gameBoard, player1)) {
                gameOver = true;
                break;
            }
            if (checkDraw(gameBoard)) {
                gameOver = true;
                console.log("It is a draw!");
                document.getElementById('status').value = "Draw!";
                break;
            }

            document.getElementById('turn').value = player2.playerName + "'s turn";
            let player2Index = await takeTurn();
            updateGameBoard(player2Index, player2);
            if (checkWin(gameBoard, player2)) {
                gameOver = true;
                break;
            }
            if (checkDraw(gameBoard)) {
                gameOver = true;
                console.log("It is a draw!");
                document.getElementById('status').value = "Draw!";
                break;
            }

            iterations++;
        }
    }

    gameLoop();
}

document.getElementById('playGame').addEventListener('click', playGame);
