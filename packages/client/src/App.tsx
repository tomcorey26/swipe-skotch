import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { SocketIoProvider } from './context/socketIO';
import { Game } from './pages/Game/Game';

const LoginPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Register</h1>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <label htmlFor="username">username</label>
        <input name="username" type="text" />
        <label htmlFor="password">password</label>
        <input name="password" type="text" />
      </form>
    </div>
  );
};

function App() {
  return (
    <div className="app">
      {/* <Navbar /> */}
      <Route exact path="/" component={Home} />
      <SocketIoProvider>
        <Route path="/game/:roomId" component={Game} />
      </SocketIoProvider>
      {/* <Route path="/chat" component={Chat} /> */}
      <Route path="/login" component={LoginPage} />
    </div>
  );
}

export default App;
