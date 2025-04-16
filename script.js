const board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let currentPlayer = "X";
let gameOver = false;

const cells = document.querySelectorAll(".cell");
const gameStatus = document.getElementById("game-status");
const restartBtn = document.getElementById("restart-btn");
const loadingScreen = document.getElementById("loading-screen");
const mainMenu = document.getElementById("main-menu");
const gameBoard = document.getElementById("game-board");
const playBtn = document.getElementById("play-btn");
const twoPlayerBtn = document.getElementById("two-player-btn");

function startGame() {
    gameOver = false;
    currentPlayer = "X";
    board.fill("");
    cells.forEach(cell => cell.innerHTML = "");
    gameStatus.innerHTML = "Player X's Turn";
    gameBoard.classList.remove("hidden");
    mainMenu.classList.add("hidden");
    loadingScreen.classList.add("hidden");
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
        [0, 4, 8], [2, 4, 6]              // diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameStatus.innerHTML = `${board[a]} Wins!`;
            gameOver = true;
            return;
        }
    }

    if (!board.includes("")) {
        gameStatus.innerHTML = "It's a Draw!";
        gameOver = true;
    }
}

function handleCellClick(e) {
    if (gameOver) return;
    const index = e.target.dataset.cell;
    if (board[index] !== "") return;

    board[index] = currentPlayer;
    e.target.innerHTML = currentPlayer;

    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (!gameOver && currentPlayer === "O") {
        aiMove(); // AI move if it's computer's turn
    }
}

function aiMove() {
    // Simple AI logic (can be upgraded to Minimax for hard mode)
    const emptyCells = board.map((value, index) => value === "" ? index : null).filter(value => value !== null);
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomCell] = "O";
    cells[randomCell].innerHTML = "O";
    checkWinner();
    currentPlayer = "X";
}

function restartGame() {
    startGame();
}

playBtn.addEventListener("click", () => {
    startGame();
    currentPlayer = "X";  // Set X to start when playing with computer
});

twoPlayerBtn.addEventListener("click", () => {
    startGame();
    currentPlayer = "X";  // Start with X in two-player mode
});

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);

// Show the loading screen before showing the main menu
window.onload = () => {
    setTimeout(() => {
        loadingScreen.classList.add("hidden");
        mainMenu.classList.remove("hidden");
    }, 3000);  // 3 seconds loading time
};
