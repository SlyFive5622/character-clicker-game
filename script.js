const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closeButton = document.querySelector('.close');
const popupRestartButton = document.getElementById('popup-restart');


let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;


const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));


    if (gameState[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }


    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;


    checkResult();
}


function checkResult() {
    let roundWon = false;


    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }


    if (roundWon) {
        displayPopup(`Player ${currentPlayer} has won!`);
        isGameActive = false;
        return;
    }


    if (!gameState.includes('')) {
        displayPopup('It\'s a draw!');
        isGameActive = false;
        return;
    }


    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


function displayPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = 'flex';
}


function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
    });
    popup.style.display = 'none';
}


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
closeButton.addEventListener('click', restartGame);
popupRestartButton.addEventListener('click', restartGame);