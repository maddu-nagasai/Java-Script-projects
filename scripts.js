// Select board and status elements
const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

// Game variables
let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning combinations
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Create board cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
}

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    // Ignore if already filled or game is over
    if (boardState[index] !== "" || !gameActive) return;

    // Update cell and board state
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check win or draw
    checkGameResult();
}

// Check for winner or draw
function checkGameResult() {
    let roundWon = false;

    // Check win conditions
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    // Check for draw
    if (!boardState.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    // Switch players
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Restart game
restartBtn.addEventListener("click", () => {
    boardState.fill("");
    document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
});
