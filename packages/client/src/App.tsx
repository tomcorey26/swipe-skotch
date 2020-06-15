import React from 'react';
import './App.scss';
import { Chat } from './components/Chat/Chat';
import { Navbar } from './components/Navbar/Navbar';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Chat />
    </div>
  );
}

export default App;
