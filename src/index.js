import { polyfill } from 'drag-drop-polyfill';
import { scrollBehaviourDragImageTranslateOverride } from 'drag-drop-polyfill';
polyfill({
    dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
});

// Light/Dark mode switch
const switchBtn = document.querySelector('.dark-mode-btn');
switchBtn.addEventListener('click', () => {
    switchBtn.classList.toggle('dark-mode');
    document.body.classList.toggle('dark-mode');
});

// Tic-tac-toe
class Game {
    constructor() {
        this.grid = document.querySelector('.grid');
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
        this.moveOrder = [];
        this.boundEventHandler = this.handleCellClick.bind(this);
        this.cells.forEach(cell => {
            cell.addEventListener('click', this.boundEventHandler);
        });
    }

    handleCellClick(cell) {
        if (this.moveCounter >= 5) {
            this.removeClick();
            // console.log('events removed');
            this.changeGameMode();
        }
        const clickedCell = cell.target;
        const cellIndex = Number(clickedCell.id);
        if (this.gameState[cellIndex] !== '' || !this.gameActive) {
            return;
        }

        this.cellPlayed(clickedCell, cellIndex);
        this.validateResult();
    }

    cellPlayed(cell, cellIndex) {
        this.moveOrder.push(cell);
        // console.log(this.moveOrder);
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
                const winningCells = [...this.cells].filter(cell => {
                    return winCondition.includes(Number(cell.id));
                });
                winningCells.forEach(cell => {
                    cell.classList.add('won');
                });
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
        this.moveCounter = 0;
        this.cells.forEach(cell => {
            cell.addEventListener('click', this.boundEventHandler);
            cell.innerText = '';
            cell.className = 'cell';
        });
        this.removeDrag();
        this.currentCellFrom = null;
        this.moveOrder = [];
    }

    removeClick() {
        this.cells.forEach(cell => {
            cell.removeEventListener('click', this.boundEventHandler);
        });
    }

    removeDrag() {
        this.cells.forEach(cell => cell.removeAttribute('draggable'));
    }

    changeGameMode() {
        this.moveOrder[0].classList.add('draggable');
        this.switchPlayer();
        this.cells.forEach(cell => {
            cell.setAttribute('draggable', 'true');
            cell.addEventListener('dragstart', this.dragStart.bind(this));
            cell.addEventListener('dragend', this.dragEnd.bind(this));
        });
        this.grid.addEventListener('dragover', this.dragOver.bind(this));
        this.grid.addEventListener('dragenter', this.dragEnter.bind(this));
        this.grid.addEventListener('dragleave', this.dragLeave.bind(this));
        this.grid.addEventListener('drop', this.drop.bind(this));
    }

    dragStart(e) {
        const cell = e.target;
        // console.log('start');
        this.currentCellFrom = cell;
    }

    dragEnd(e) {
        // console.log('end');
        e.target.classList.remove('draggable');
        if (this.gameActive) this.moveOrder[0].classList.add('draggable');
    }

    dragOver(e) {
        e.preventDefault();
    }

    dragEnter(e) {
        e.preventDefault();
    }

    dragLeave(e) {
        e.preventDefault();
    }

    drop(e) {
        const droppedCell = e.target;
        const droppedCellIndex = Number(droppedCell.id);
        if (
            this.gameState[droppedCellIndex] !== '' ||
            !this.gameActive ||
            this.currentCellFrom.innerText !== this.currentPlayer ||
            !this.checkCurrentDraggableCell(droppedCell)
        ) {
            return;
        }

        this.setAfterDropping(droppedCell, droppedCellIndex);
        this.validateResult();
    }

    checkCurrentDraggableCell(currentCellTo) {
        if (this.moveOrder.indexOf(this.currentCellFrom) === 0) {
            this.moveOrder.shift();
            this.moveOrder.push(currentCellTo);
            // console.log(this.moveOrder);
            return true;
        } else {
            return false;
        }
    }

    setAfterDropping(droppedCell, droppedCellIndex) {
        droppedCell.className = 'cell';
        droppedCell.innerText = this.currentPlayer;
        this.gameState[droppedCellIndex] = this.currentPlayer;
        this.gameState[Number(this.currentCellFrom.id)] = '';
        this.currentCellFrom.innerText = '';
        this.currentCellFrom = null;
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
game.restartBtn.addEventListener('click', game.restartGame.bind(game));
