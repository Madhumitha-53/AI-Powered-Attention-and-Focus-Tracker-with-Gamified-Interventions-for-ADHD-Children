const exercises = [
    { name: "Shoulder Rolls", duration: 30, emoji: "🔄" },
    { name: "Arm Stretches", duration: 30, emoji: "💪" },
    { name: "Neck Tilts", duration: 30, emoji: "🙂" },
    { name: "Standing Twists", duration: 30, emoji: "🌀" },
    { name: "Deep Breathing", duration: 30, emoji: "🫁" }
];

let currentExercise = 0;
let timer = null;
let isExercising = false;

function startExercise() {
    if (isExercising) return;
    
    isExercising = true;
    currentExercise = 0;
    document.getElementById('start-button').textContent = 'In Progress...';
    runExercise();
}

function runExercise() {
    if (currentExercise >= exercises.length) {
        completeWorkout();
        return;
    }

    const exercise = exercises[currentExercise];
    let timeLeft = exercise.duration;
    
    updateExerciseDisplay(exercise);
    updateTimer(timeLeft);
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimer(timeLeft);
        updateProgress(timeLeft, exercise.duration);
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentExercise++;
            setTimeout(runExercise, 1000);
        }
    }, 1000);
}

function updateExerciseDisplay(exercise) {
    document.getElementById('exercise-emoji').textContent = exercise.emoji;
    document.getElementById('exercise-name').textContent = exercise.name;
}

function updateTimer(seconds) {
    const display = `00:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timer').textContent = display;
}

function updateProgress(timeLeft, duration) {
    const percent = ((duration - timeLeft) / duration) * 100;
    document.getElementById('progress').style.width = `${percent}%`;
}

function completeWorkout() {
    isExercising = false;
    document.getElementById('exercise-emoji').textContent = '🎉';
    document.getElementById('exercise-name').textContent = 'Workout Complete!';
    document.getElementById('timer').textContent = 'Great job!';
    document.getElementById('start-button').textContent = 'Start Again';
    document.getElementById('progress').style.width = '100%';
    showConfetti();
}

function showConfetti() {
    const colors = ['#FF9800', '#FF5722', '#FF6B6B', '#FF8E53'];
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