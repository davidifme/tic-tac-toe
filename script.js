function Gameboard() {
    const rows = 3;
    const columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell())
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getCellValue()));
        console.log(boardWithCellValues);
    }

    const clearBoard = () => {
        board.map(row => row.map(cell => cell.setCellValue('')));
    };

    return { getBoard, printBoard, clearBoard }
}

function Cell() {
    let value = '';

    const setCellValue = (tokenType) => {
        value = tokenType;
    };
    const getCellValue = () => value;

    return { setCellValue, getCellValue }
}

function GameFlow(playerOneName = 'Player One', playerTwoName = 'Player Two') {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: 'X'
        },
        {
            name: playerTwoName,
            token: 'O'
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
      };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const resetGame = () => {
        board.clearBoard();
        activePlayer = players[0];
    };

    const checkWinner = () => {
        const b = board.getBoard().map(row => row.map(cell => cell.getCellValue()));
        const currentToken = activePlayer.token;

        // Check rows
        for (let i = 0; i < 3; i++) {
            if (b[i][0] === currentToken && b[i][1] === currentToken && b[i][2] === currentToken) {
                return true;
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (b[0][i] === currentToken && b[1][i] === currentToken && b[2][i] === currentToken) {
                return true;
            }
        }

        // Check diagonals
        if (b[0][0] === currentToken && b[1][1] === currentToken && b[2][2] === currentToken) {
            return true;
        }
        if (b[0][2] === currentToken && b[1][1] === currentToken && b[2][0] === currentToken) {
            return true;
        }

        return false;
    };

    const playRound = (row, column) => {
        if (board.getBoard()[row][column].getCellValue() === '') {
            board.getBoard()[row][column].setCellValue(activePlayer.token);

            if (checkWinner()) {
                board.printBoard();
                console.log(`${getActivePlayer().name} wins!`)
                resetGame();
                return;
            }

            switchPlayerTurn();
            printNewRound()
        } else {
            return console.log(`This cell is occupied!`)
        }
    };

    printNewRound();

    return { playRound, getActivePlayer, resetGame }
}

const game = GameFlow();