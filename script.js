const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restart = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        const index = Number(cell.dataset.index);

        // Don't allow clicking an already-filled cell
        if (board[index] !== "" || !gameActive) {
            return;
        }

        // Put X or O in the clicked cell
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        checkWinner();
    });
});

function checkWinner() {
    // Check for a winner
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            status.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }
    }

    // Check for a draw ONLY when all 9 cells are filled
    if (!board.includes("")) {
        status.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    // Change player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s Turn`;
}

restart.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach((cell) => {
        cell.textContent = "";
    });

    status.textContent = "Player X's Turn";
});