import React, { useState, useEffect, SyntheticEvent } from 'react';
import { ChatLog } from '../ChatLog/ChatLog';
import { ChatMessages } from '../ChatMessages/ChatMessages';
import socketIOClient from 'socket.io-client';
import './Chat.scss';
const ENDPOINT = 'http://localhost:4000';

interface ChatProps {}

export const Chat: React.FC<ChatProps> = ({}) => {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    socket.on('new message', (data: { message: string }) => {
      console.log(data);
      setMessages((m) => [...m, data.message]);
    });
  }, []);

  const emitMessage = (e: SyntheticEvent) => {
    e.preventDefault();
    socket.emit('new message', text);
    setText('');
  };
  return (
    <>
      <div className="center chat">
        <ChatMessages>
          {messages.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ChatMessages>
        <ChatLog />
      </div>
      <div className="center">
        <form onSubmit={emitMessage}>
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            data-testid="chat-input"
          />
          <button onClick={emitMessage} data-testid="submit-button">
            submit
          </button>
        </form>
      </div>
    </>
  );
};
