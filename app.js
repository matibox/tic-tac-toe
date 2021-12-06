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
let currentMove = 0;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningMessage = () => `Gracz ${currentPlayer} wygrał!`;
const currentPlayerTurn = () => `Teraz tura gracza ${currentPlayer}`;
const drawMessage = () => `Gra zakończyła się remisem!`;
statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(cellEvent) {
    const clickedCell = cellEvent.target;
    const clickedCellIndex = Number(clickedCell.id);
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    currentMove++;
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation(currentMove);
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = currentPlayerTurn();
    cells.forEach(cell => (cell.innerHTML = ''));
}

function handleModeChange() {}

function handleCellMove() {}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
