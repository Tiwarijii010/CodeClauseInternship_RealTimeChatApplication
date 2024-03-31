// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './styles.css'; // Import CSS file

const socket = io('http://localhost:5000', { transports: ['websocket'] });

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    socket.on('message', message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('message');
    };
  }, []); // Run this effect only once on component mount

  const handleMessageSubmit = () => {
    if (inputMessage.trim() !== '') {
      socket.emit('message', inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleMessageSubmit();
    }
  };

  return (
    <div className="container">
      <h1 className="title">Real-Time Chat Application</h1>
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="message">{message}</div>
        ))}
      </div>
      <input
        type="text"
        className="input-field"
        value={inputMessage}
        onChange={e => setInputMessage(e.target.value)}
        onKeyPress={handleKeyPress} // Handle keypress event
      />
      <button className="button" onClick={handleMessageSubmit}>Send</button>
    </div>
  );
}

export default App;
