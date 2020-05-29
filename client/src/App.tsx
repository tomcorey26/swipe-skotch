import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client';
import { Chat } from './components/Chat/Chat';
const ENDPOINT = 'http://localhost:4000';

function App() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('new message', (data: { message: string }) => {
      console.log(data);
      setMessages((m) => [...m, data.message]);
    });
  }, []);

  const emitMessage = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit('new message', text);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button onClick={emitMessage}>submit</button>
      <Chat />
      {messages.map((m, i) => (
        <div key={i}>{m}</div>
      ))}
    </div>
  );
}

export default App;
