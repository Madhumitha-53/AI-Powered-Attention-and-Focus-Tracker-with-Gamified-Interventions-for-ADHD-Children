from sklearn.ensemble import RandomForestClassifier
import numpy as np

class AttentionClassifier:
    def __init__(self):
        self.model = RandomForestClassifier()
        self.attention_states = ['Focused', 'Distracted', 'Restless']
        
    def preprocess_features(self, data):
        # Calculate features from raw sensor data
        features = {
            'heart_rate_mean': data['heart_rate'].mean(),
            'heart_rate_std': data['heart_rate'].std(),
            'movement_mean': data['movement'].mean(),
            'gaze_focus_mean': data['gaze_focus'].mean(),
            'movement_variance': data['movement'].var()
        }
        return np.array(list(features.values())).reshape(1, -1)
    
    def classify_attention(self, data):
        features = self.preprocess_features(data)
        # For PoC, use simple rule-based classification
        attention_score = (
            0.4 * (100 - abs(95 - features[0][0])) +  # heart rate deviation from 95
            0.3 * (10 - features[0][2]) +             # less movement is better
            0.3 * features[0][3]                      # higher gaze focus is better
        ) / 100
        
        if attention_score > 0.7:
            return 'Focused'
        elif attention_score < 0.4:
            return 'Restless'
        else:
            return 'Distracted'