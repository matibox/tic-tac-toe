// Light/dark mode switch

const background = document.querySelector('main');
const lightBtn = document.getElementById('light-mode');
const darkBtn = document.getElementById('dark-mode');
const darkAnimationTime = 1; // In seconds
const lightAnimationTime = 0.75; // In seconds

lightBtn.addEventListener('click', () => {
    background.classList.remove('dark');
    lightBtn.style.animation = `rotation ${darkAnimationTime}s ease-out`;
    setTimeout(() => (lightBtn.style.animation = ''), darkAnimationTime * 1000);
});

darkBtn.addEventListener('click', () => {
    background.classList.add('dark');
    darkBtn.style.animation = `rotation ${lightAnimationTime}s ease-out`;
    setTimeout(() => (darkBtn.style.animation = ''), lightAnimationTime * 1000);
});

// Tic Tac Toe

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.move');
const restartButton = document.querySelector('.game-restart');

let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningMessage = () => `Gracz ${currentPlayer} wygrał!`;
const currentPlayerTurn = () => `Teraz tura gracza ${currentPlayer}`;
statusDisplay.innerHTML = currentPlayerTurn();

const winConditions = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9],
];

function handleCellPlayed(clickedCell, index) {
    gameState[index] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {}

function handleResultValidation() {}

function handleCellClick(cellEvent) {
    const clickedCell = cellEvent.target;
    const clickedCellIndex = Number(clickedCell.id);

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {}

function handleModeChange() {}

function handleCellMove() {}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
