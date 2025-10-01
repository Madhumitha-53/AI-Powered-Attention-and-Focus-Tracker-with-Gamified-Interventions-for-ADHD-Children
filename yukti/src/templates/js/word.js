const puzzles = [
    {
        word: 'FOCUS',
        grid: ['F', 'P', 'O', 'W', 'Q',
               'R', 'C', 'S', 'X', 'Y',
               'U', 'T', 'M', 'N', 'L',
               'S', 'H', 'K', 'J', 'I']
    },
    {
        word: 'LEARN',
        grid: ['L', 'K', 'M', 'N', 'P',
               'E', 'Q', 'R', 'S', 'T',
               'A', 'U', 'V', 'W', 'X',
               'R', 'Y', 'Z', 'B', 'N']
    },
    {
        word: 'STUDY',
        grid: ['S', 'R', 'Q', 'P', 'O',
               'T', 'N', 'M', 'L', 'K',
               'U', 'J', 'I', 'H', 'G',
               'D', 'F', 'E', 'C', 'Y']
    }
];

let currentPuzzle = null;
let selectedCells = [];

function startGame() {
    currentPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    document.getElementById('target-word').textContent = `Find the word: ${currentPuzzle.word}`;
    createGrid();
}

function createGrid() {
    const grid = document.getElementById('word-grid');
    grid.innerHTML = '';
    
    currentPuzzle.grid.forEach((letter, index) => {
        const cell = document.createElement('div');
        cell.className = 'letter-cell';
        cell.textContent = letter;
        cell.onclick = () => selectCell(cell, index);
        grid.appendChild(cell);
    });
}

function selectCell(cell, index) {
    if (!cell.classList.contains('selected')) {
        cell.classList.add('selected');
        selectedCells.push({ cell, letter: cell.textContent });
        
        if (selectedCells.length === currentPuzzle.word.length) {
            checkWord();
        }
    }
}

function checkWord() {
    const selectedWord = selectedCells.map(cell => cell.letter).join('');
    
    setTimeout(() => {
        if (selectedWord === currentPuzzle.word) {
            showConfetti();
            alert('Congratulations! You found the word! 🎉');
        } else {
            alert('Not quite right. Try again!');
        }
        
        selectedCells.forEach(({cell}) => cell.classList.remove('selected'));
        selectedCells = [];
        startGame();
    }, 500);
}

function showConfetti() {
    const colors = ['#2196F3', '#03A9F4', '#00BCD4', '#4CAF50'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

window.onload = startGame;