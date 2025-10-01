import unittest
import pandas as pd
from src.data_simulator import SensorDataSimulator
from src.data_storage import DataStorage
from src.attention_classifier import AttentionClassifier
from src.attention_monitor import AttentionMonitor

class TestAttentionSystem(unittest.TestCase):
    def setUp(self):
        self.simulator = SensorDataSimulator()
        self.classifier = AttentionClassifier()
        self.monitor = AttentionMonitor(self.simulator, self.classifier)
        self.storage = DataStorage()

    def test_data_simulator(self):
        data = self.simulator.generate_session_data(duration_minutes=1)
        self.assertIsInstance(data, pd.DataFrame)
        self.assertTrue('heart_rate' in data.columns)
        self.assertTrue('movement' in data.columns)
        self.assertTrue('gaze_focus' in data.columns)
        
        # Test value ranges
        self.assertTrue(all(70 <= hr <= 120 for hr in data['heart_rate']))
        self.assertTrue(all(0 <= mv <= 10 for mv in data['movement']))
        self.assertTrue(all(0 <= gz <= 100 for gz in data['gaze_focus']))

    def test_attention_classifier(self):
        data = self.simulator.generate_session_data(duration_minutes=1)
        attention_state = self.classifier.classify_attention(data)
        self.assertIn(attention_state, ['Focused', 'Distracted', 'Restless'])

    def test_attention_monitor(self):
        window_data = self.monitor.get_window_data()
        self.assertIsInstance(window_data, pd.DataFrame)
        
        # Test intervention suggestions
        for state in ['Focused', 'Distracted', 'Restless']:
            suggestion = self.monitor.suggest_intervention(state)
            self.assertIsInstance(suggestion, str)
            self.assertNotEqual(suggestion, '')

if __name__ == '__main__':
    unittest.main()