# backend/app.py
from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__, template_folder='../frontend/public')
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('message')
def handle_message(message):
    print('Received message:', message)  # Output received message to console
    socketio.emit('message', message)

if __name__ == '__main__':
    socketio.run(app, debug=True)
