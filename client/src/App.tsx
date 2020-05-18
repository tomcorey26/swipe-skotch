import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [foo, setFoo] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000').then(async (res) => {
      console.log(res);
      const { data } = await res.json();
      setFoo(data);
    });
  }, []);

  return (
    <div className="App">
      <p>{foo}</p>
    </div>
  );
}

export default App;
