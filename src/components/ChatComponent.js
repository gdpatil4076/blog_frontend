import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import '../styles/chat.css';
import Videocall from './Videocalll';

const socket = io.connect();

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for 'chat message' events from the server
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Cleanup when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);


  const sendMessage = () => {
    // Emit a 'chat message' event to the server
    socket.emit('chat message', message);
    setMessage('');
  };


  return (
<div className="chat-container mt-4">
  <ul className="message-list">
    {messages.map((msg, index) => (
      <li key={index}>{msg}</li>
    ))}
  </ul>
  <div className="input-container mt-2">
    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type your message..."
    />
    <button onClick={sendMessage}>Send</button>
  </div>
  <Videocall/>
</div>

    

  );
};

export default ChatComponent;
