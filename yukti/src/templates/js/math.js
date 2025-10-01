let currentProblem = null;
let timer = null;

const problems = [
    { question: "12 × 8", answer: 96 },
    { question: "15 + 26", answer: 41 },
    { question: "45 - 17", answer: 28 },
    { question: "72 ÷ 9", answer: 8 },
    { question: "13 × 7", answer: 91 },
    { question: "56 + 38", answer: 94 },
    { question: "84 - 29", answer: 55 },
    { question: "48 ÷ 6", answer: 8 }
];

function startGame() {
    clearInterval(timer);
    startTimer(30);
    showNewProblem();
}

function startTimer(seconds) {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = seconds;
    
    timer = setInterval(() => {
        seconds--;
        timerElement.textContent = seconds;
        
        if (seconds <= 0) {
            clearInterval(timer);
            alert('Time\'s up! Let\'s try another question.');
            startGame();
        }
    }, 1000);
}

function showNewProblem() {
    currentProblem = problems[Math.floor(Math.random() * problems.length)];
    document.getElementById('question').textContent = currentProblem.question;
    document.getElementById('answer').value = '';
    document.getElementById('answer').focus();
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    if (isNaN(userAnswer)) {
        alert('Please enter a number!');
        return;
    }
    
    if (userAnswer === currentProblem.answer) {
        alert('Correct! 🎉');
        clearInterval(timer);
        setTimeout(startGame, 1000);
    } else {
        alert('Not quite right. Try again!');
        document.getElementById('answer').value = '';
        document.getElementById('answer').focus();
    }
}

// Handle Enter key
document.getElementById('answer').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Start the game when the page loads
window.onload = startGame;