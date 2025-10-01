// Session tracking variables
let sessionStartTime = new Date();
let focusScore = 100;
let interventionCount = 0;

// Update session duration every second
setInterval(updateSessionDuration, 1000);

function updateSessionDuration() {
    const now = new Date();
    const duration = Math.floor((now - sessionStartTime) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    document.getElementById('session-duration').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Simulate attention monitoring
setInterval(monitorAttention, 30000);

function monitorAttention() {
    // Simulate attention drop
    focusScore = Math.max(0, focusScore - Math.random() * 15);
    document.getElementById('focus-score').textContent = `${Math.round(focusScore)}%`;
    
    updateAttentionState();
}

function updateAttentionState() {
    const attentionState = document.getElementById('attention-state');
    const intervention = document.getElementById('intervention');
    
    if (focusScore < 40) {
        attentionState.textContent = 'Low Focus';
        attentionState.style.color = '#FF5722';
        suggestIntervention('high');
    } else if (focusScore < 70) {
        attentionState.textContent = 'Moderate Focus';
        attentionState.style.color = '#FF9800';
        suggestIntervention('medium');
    } else {
        attentionState.textContent = 'Good Focus';
        attentionState.style.color = '#4CAF50';
        intervention.textContent = 'Keep up the good work!';
    }
}

function suggestIntervention(level) {
    const interventions = {
        high: [
            'Take a movement break',
            'Do some breathing exercises',
            'Play a quick memory game'
        ],
        medium: [
            'Try a quick math puzzle',
            'Find a hidden word',
            'Take three deep breaths'
        ]
    };

    const suggestions = interventions[level];
    const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    document.getElementById('intervention').textContent = suggestion;
}

function startIntervention() {
    interventionCount++;
    document.getElementById('intervention-count').textContent = interventionCount;
    
    const suggestion = document.getElementById('intervention').textContent.toLowerCase();
    
    if (suggestion.includes('movement')) {
        window.location.href = './games/movement.html';
    } else if (suggestion.includes('breathing')) {
        window.location.href = './games/breathing.html';
    } else if (suggestion.includes('memory')) {
        window.location.href = './games/memory.html';
    } else if (suggestion.includes('math')) {
        window.location.href = './games/math.html';
    } else if (suggestion.includes('word')) {
        window.location.href = './games/word.html';
    }
    
    // Boost focus score after intervention
    focusScore = Math.min(100, focusScore + 30);
    updateAttentionState();
}

// Initialize the page
window.onload = function() {
    updateAttentionState();
    updateSessionDuration();
};