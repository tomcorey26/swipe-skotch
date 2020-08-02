import React from 'react';
import './SideCard.scss';
import socketIOClient from 'socket.io-client';
import { useSocketTextChat } from '../../../hooks';

interface SideCardProps {
  socket: SocketIOClient.Socket;
}

export const SideCard: React.FC<SideCardProps> = ({ socket }) => {
  const { emitMessage, input, messages, setInput } = useSocketTextChat(socket);
  return (
    <div className="side-card">
      <div className="chat-log">
        <ul className="message-list">
          {messages.map((msg, i) => (
            <li key={i} className={'from-me'}>
              {msg.username}: {msg.text}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={emitMessage} className="chat-input">
        <input
          id="vid-chat-input"
          className="sk-input"
          type="text"
          placeholder="Type a message here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button disabled={!input} className="sk-button-primary">
          SEND
        </button>
      </form>
    </div>
  );
};
