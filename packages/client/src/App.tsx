import React from 'react';
import './App.scss';
import { Chat } from './components/Chat/Chat';
import { Navbar } from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ChessGame } from './pages/Chess/Chess';
import { Home } from './pages/Home/Home';
import { ChessProvider } from './context/chess';
import { SocketIoProvider } from './context/socketIO';

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
      <Router>
        <Route exact path="/" component={Home} />
        <ChessProvider>
          <SocketIoProvider>
            <Route path="/chess" component={ChessGame} />
          </SocketIoProvider>
        </ChessProvider>
        {/* <Route path="/chat" component={Chat} /> */}
        <Route path="/login" component={LoginPage} />
      </Router>
    </div>
  );
}

export default App;
