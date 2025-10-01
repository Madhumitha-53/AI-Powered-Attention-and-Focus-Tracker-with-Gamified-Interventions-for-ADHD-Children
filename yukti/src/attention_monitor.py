import time
from datetime import datetime, timedelta
import pandas as pd

class AttentionMonitor:
    def __init__(self, simulator, classifier, window_size=30):
        self.simulator = simulator
        self.classifier = classifier
        self.window_size = window_size  # seconds
        self.current_state = None
        
    def get_window_data(self):
        return self.simulator.generate_session_data(
            duration_minutes=self.window_size/60, 
            sampling_rate_seconds=1
        )
    
    def suggest_intervention(self, attention_state):
        interventions = {
            'Distracted': 'Take a quick quiz to refocus',
            'Restless': 'Try some deep breathing exercises',
            'Focused': 'Great job! Keep going!'
        }
        return interventions.get(attention_state, '')