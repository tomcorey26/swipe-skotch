import React from 'react';
import './ChatMessage.scss';
import { useSocketTextChat } from '../../hooks';
import { useSocketIoContext } from '../../context/socketIO';

interface ChatMessagesProps {}

export const ChatMessages: React.FC<ChatMessagesProps> = ({}) => {
  const { socket } = useSocketIoContext();
  const { input, setInput, emitMessage, messages } = useSocketTextChat(socket);
  return (
    <>
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
    </>
  );
};
