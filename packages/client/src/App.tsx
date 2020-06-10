import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Chat } from './components/Chat/Chat';
import { foo } from '@skotch/common';

function App() {
  return (
    <div>
      {foo(2)}
      <Chat />
    </div>
  );
}

export default App;
