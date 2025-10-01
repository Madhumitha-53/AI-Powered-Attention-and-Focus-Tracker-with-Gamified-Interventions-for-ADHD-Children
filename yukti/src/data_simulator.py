import numpy as np
import pandas as pd
from datetime import datetime, timedelta

class SensorDataSimulator:
    def __init__(self):
        self.heart_rate_range = (70, 120)  # Normal child heart rate range
        self.movement_range = (0, 10)      # Arbitrary movement intensity scale
        self.gaze_range = (0, 100)         # Percentage of screen focus

    def generate_heart_rate(self):
        return np.random.uniform(self.heart_rate_range[0], self.heart_rate_range[1])

    def generate_movement(self):
        # Simulate movement intensity (0: still, 10: highly active)
        return np.random.uniform(self.movement_range[0], self.movement_range[1])

    def generate_gaze_focus(self):
        # Simulate gaze focus percentage
        return np.random.uniform(self.gaze_range[0], self.gaze_range[1])

    def generate_session_data(self, duration_minutes=60, sampling_rate_seconds=1):
        timestamps = []
        heart_rates = []
        movements = []
        gaze_focuses = []
        
        start_time = datetime.now()
        samples = int(duration_minutes * 60 / sampling_rate_seconds)
        
        for i in range(samples):
            current_time = start_time + timedelta(seconds=i * sampling_rate_seconds)
            timestamps.append(current_time)
            heart_rates.append(self.generate_heart_rate())
            movements.append(self.generate_movement())
            gaze_focuses.append(self.generate_gaze_focus())
        
        return pd.DataFrame({
            'timestamp': timestamps,
            'heart_rate': heart_rates,
            'movement': movements,
            'gaze_focus': gaze_focuses
        })