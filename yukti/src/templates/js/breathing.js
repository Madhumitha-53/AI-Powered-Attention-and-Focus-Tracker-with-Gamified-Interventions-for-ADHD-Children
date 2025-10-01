let isBreathing = false;
let breathCount = 0;
const totalBreaths = 5;

const circle = document.getElementById('breathingCircle');
const instruction = document.getElementById('instruction');
const progress = document.getElementById('progress');

circle.addEventListener('click', startBreathing);

function startBreathing() {
    if (isBreathing) return;
    isBreathing = true;
    breathCount = 0;
    updateProgress();
    breathingCycle();
}

function breathingCycle() {
    if (breathCount >= totalBreaths) {
        completeExercise();
        return;
    }

    // Inhale
    circle.textContent = 'Inhale';
    instruction.textContent = 'Breathe in slowly...';
    circle.className = 'breathing-circle inhale';

    setTimeout(() => {
        // Hold
        circle.textContent = 'Hold';
        instruction.textContent = 'Hold your breath...';
        circle.className = 'breathing-circle';

        setTimeout(() => {
            // Exhale
            circle.textContent = 'Exhale';
            instruction.textContent = 'Breathe out slowly...';
            circle.className = 'breathing-circle exhale';

            setTimeout(() => {
                circle.className = 'breathing-circle';
                breathCount++;
                updateProgress();
                breathingCycle();
            }, 4000); // Exhale duration
        }, 2000); // Hold duration
    }, 4000); // Inhale duration
}

function updateProgress() {
    progress.textContent = `Completed breaths: ${breathCount}/${totalBreaths}`;
}

function completeExercise() {
    isBreathing = false;
    circle.textContent = 'Start';
    instruction.textContent = 'Great job! Click to start again';
    circle.className = 'breathing-circle';
    showConfetti();
}

function showConfetti() {
    const colors = ['#9C27B0', '#E91E63', '#FF9800', '#2196F3'];
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