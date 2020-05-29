import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:4000';

function App() {
  const [foo, setFoo] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data) => {
      console.log(data);
      setResponse(data);
    });
  }, []);

  return (
    <div className="App">
      <p>{response}</p>
    </div>
  );
}

export default App;
