// Guess the number
let answer = Math.floor(Math.random() * 10) + 1;
let attempts = 0;

function guessNumber() {
    const playerGuess = parseInt(document.getElementById("playerGuess").value);
    attempts++;

    if (isNaN(playerGuess) || playerGuess < 1 || playerGuess > 10) {
        document.getElementById("message").textContent = "Proszę podać liczbę od 1 do 10.";
    } else if (playerGuess === answer) {
        document.getElementById("message").textContent = `Brawo! Zgadłeś za ${attempts} razem! ${outcomeEmoji = "🥳"}`;
    } else if (playerGuess > answer) {
        document.getElementById("message").textContent = `Za wysoko... ${outcomeEmoji = "😢"}`;
    } else {
        document.getElementById("message").textContent = `Za nisko... ${outcomeEmoji = "😢"}`;
    }
}

// Paper rock scissors
function playGame(userChoice) {
    const choices = ['papier', 'kamień', 'nożyce'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let result = '';
    let userIcon = '';
    let computerIcon = '';
    let outcomeEmoji = '';

    if (userChoice === 'papier') {
        userIcon = '📰';  
    } else if (userChoice === 'kamień') {
        userIcon = '🪨';  
    } else if (userChoice === 'nożyce') {
        userIcon = '✂️';  
    }

    if (computerChoice === 'papier') {
        computerIcon = '📰';  
    } else if (computerChoice === 'kamień') {
        computerIcon = '🪨';  
    } else if (computerChoice === 'nożyce') {
        computerIcon = '✂️';  
    }

    if (userChoice === computerChoice) {
        result = "Remis! Obie strony wybrały " + userChoice + ".";
        outcomeEmoji = "🤝";
    } else if (
        (userChoice === 'papier' && computerChoice === 'kamień') ||
        (userChoice === 'kamień' && computerChoice === 'nożyce') ||
        (userChoice === 'nożyce' && computerChoice === 'papier')
    ) {
        result = "Wygrałeś! " + userChoice + " pokonuje " + computerChoice + ".";
        outcomeEmoji = "🥳";
    } else {
        result = "Przegrałeś! " + computerChoice + " pokonuje " + userChoice + ".";
        outcomeEmoji = "😢";
    }

    document.getElementById("result").innerHTML = `
        <div>
            <p>Twój wybór: <strong>${userIcon} ${userChoice}</strong></p>
        </div>
        <div>
            <p>Wybór komputera: <strong>${computerIcon} ${computerChoice}</strong></p>
        </div>
        <p>${outcomeEmoji} ${result}</p>
    `;
}

// Cross and circle
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;

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

const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('statusMessage');
const resetButton = document.getElementById('resetButton');

function handleClick(event) {
    const index = event.target.getAttribute('data-index');

    if (board[index] !== '' || isGameOver) {
        return;
    }

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        statusMessage.textContent = `Wygrał gracz: ${currentPlayer}`;
        isGameOver = true;
        return;
    } else if (board.every(cell => cell !== '')) {
        statusMessage.textContent = 'Remis!';
        isGameOver = true;
        return;
    }

    currentPlayer = 'O';
    statusMessage.textContent = `Ruch gracza: ${currentPlayer}`;

    setTimeout(computerMove, 500);
}

function computerMove() {
    if (isGameOver) return;

    const availableCells = board
        .map((value, index) => (value === '' ? index : null))
        .filter(index => index !== null);

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

    board[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;

    if (checkWin()) {
        statusMessage.textContent = `Wygrał gracz: ${currentPlayer}`;
        isGameOver = true;
    } else if (board.every(cell => cell !== '')) {
        statusMessage.textContent = 'Remis!';
        isGameOver = true;
    } else {
        currentPlayer = 'X';
        statusMessage.textContent = `Ruch gracza: ${currentPlayer}`;
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function resetGame() {
    board.fill('');
    currentPlayer = 'X';
    isGameOver = false;
    cells.forEach(cell => (cell.textContent = ''));
    statusMessage.textContent = 'Ruch gracza: X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
