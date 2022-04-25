// Light/Dark mode switch
const switchBtn = document.querySelector('.dark-mode-btn');
switchBtn.addEventListener('click', () => {
    switchBtn.classList.toggle('dark-mode');
    document.body.classList.toggle('dark-mode');
});

// Tic-tac-toe
class Game {
    constructor() {
        this.cells = document.querySelectorAll('.cell');
        this.message = document.querySelector('.current-move');
        this.restartBtn = document.querySelector('.restart-btn');
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        this.gameState = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.moveCounter = 0;
        this.boundEventHandler = this.handleCellClick.bind(this);
        this.cells.forEach(cell => {
            cell.addEventListener('click', this.boundEventHandler);
        });
    }

    handleCellClick(cell) {
        if (this.moveCounter >= 5) {
            this.removeClick();
            console.log('events removed');
        }
        const clickedCell = cell.target;
        const cellIndex = Number(clickedCell.id);
        if (this.gameState[cellIndex] !== '' || !this.gameActive) {
            return;
        }

        this.cellPlayed(clickedCell, cellIndex);
        this.validateResult();
    }

    removeClick() {
        this.cells.forEach(cell => {
            cell.removeEventListener('click', this.boundEventHandler);
        });
    }

    cellPlayed(cell, cellIndex) {
        this.gameState[cellIndex] = this.currentPlayer;
        const icon = new Icon(this.currentPlayer, cell);
        icon.placeIcon();
    }

    switchPlayer() {
        const currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.message.innerText = `Teraz tura gracza ${currentPlayer}`;
        return currentPlayer;
    }

    validateResult() {
        let isWon = false;
        for (let i = 0; i < this.winningConditions.length; i++) {
            const winCondition = this.winningConditions[i];
            let a = this.gameState[winCondition[0]];
            let b = this.gameState[winCondition[1]];
            let c = this.gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                isWon = true;
                break;
            }
        }

        if (isWon) {
            this.message.innerText = `Gracz ${this.currentPlayer} wygrał!`;
            this.gameActive = false;
            return;
        }
        const isDrawn = !this.gameState.includes('');
        if (isDrawn) {
            this.message.innerText = `Gra zakończyła się remisem!`;
            this.gameActive = false;
            return;
        }

        this.currentPlayer = this.switchPlayer();
        this.moveCounter++;
    }

    restartGame() {
        this.gameActive = true;
        this.gameState = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.message.innerText = 'Teraz tura gracza X';
        this.cells.forEach(cell => (cell.innerText = ''));
    }

    changeGameMode() {
        console.log('Mode changed');
        console.log(this.moveCounter);
    }
}

class Icon {
    constructor(type, cell) {
        this.type = type;
        this.cell = cell;
    }

    placeIcon() {
        this.cell.innerText = this.type;
    }
}

const game = new Game();
/*
game.cells.forEach(cell => {
    cell.addEventListener('click', game.handleCellClick.bind(game));
});
*/
game.restartBtn.addEventListener('click', game.restartGame.bind(game));
