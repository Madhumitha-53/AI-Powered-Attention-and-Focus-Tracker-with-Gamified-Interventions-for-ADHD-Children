const emojis = ['🌟', '🎈', '🎨', '🎭', '🎪', '🎡', '🌈', '🎵', '🎮', '🎯'];
const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
let flippedCards = [];
let matchedPairs = 0;

function initializeGame() {
    const grid = document.getElementById('memory-grid');
    grid.innerHTML = '';
    matchedPairs = 0;
    document.getElementById('score').textContent = '0';
    
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.value = emoji;
        card.textContent = '?';
        card.onclick = () => flipCard(card);
        grid.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length === 2 || card.classList.contains('flipped')) return;
    
    card.classList.add('flipped');
    card.textContent = card.dataset.value;
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        matchedPairs++;
        document.getElementById('score').textContent = matchedPairs;
        if (matchedPairs === 10) {
            setTimeout(() => {
                alert('Congratulations! You found all pairs! 🎉');
                initializeGame();
            }, 500);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '?';
        card2.textContent = '?';
    }
    flippedCards = [];
}

// Start the game when the page loads
window.onload = initializeGame;