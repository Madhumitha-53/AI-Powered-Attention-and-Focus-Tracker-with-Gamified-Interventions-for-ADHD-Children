import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.data_simulator import SensorDataSimulator
from src.data_storage import DataStorage
from src.attention_classifier import AttentionClassifier
from src.attention_monitor import AttentionMonitor
import time

def main():
    # Create instances
    simulator = SensorDataSimulator()
    classifier = AttentionClassifier()
    monitor = AttentionMonitor(simulator, classifier)
    storage = DataStorage()
    
    # Simulate real-time monitoring for 1 minute
    print("Starting real-time attention monitoring...")
    for _ in range(2):  # 2 windows of 30 seconds each
        # Get window data
        window_data = monitor.get_window_data()
        
        # Classify attention
        attention_state = classifier.classify_attention(window_data)
        
        # Get intervention suggestion
        intervention = monitor.suggest_intervention(attention_state)
        
        # Print results
        print(f"\nCurrent Attention State: {attention_state}")
        print(f"Suggested Intervention: {intervention}")
        
        # Store the data
        storage.save_session(window_data)
        
        # Wait for next window
        time.sleep(5)  # Reduced for testing purposes

if __name__ == "__main__":
    main()