from flask import Flask, render_template, jsonify
from data_simulator import SensorDataSimulator
from attention_classifier import AttentionClassifier
from attention_monitor import AttentionMonitor
import threading
import time

app = Flask(__name__)

# Initialize components
simulator = SensorDataSimulator()
classifier = AttentionClassifier()
monitor = AttentionMonitor(simulator, classifier)

# Global variables for current state
current_state = "Unknown"
current_intervention = ""

def background_monitoring():
    global current_state, current_intervention
    while True:
        window_data = monitor.get_window_data()
        current_state = classifier.classify_attention(window_data)
        current_intervention = monitor.suggest_intervention(current_state)
        time.sleep(5)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/status')
def get_status():
    return jsonify({
        'attention_state': current_state,
        'intervention': current_intervention
    })

if __name__ == '__main__':
    # Start background monitoring in a separate thread
    monitoring_thread = threading.Thread(target=background_monitoring, daemon=True)
    monitoring_thread.start()
    app.run(debug=True)