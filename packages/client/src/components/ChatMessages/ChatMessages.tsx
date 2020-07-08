import React, { SyntheticEvent, useState, useEffect } from 'react';
import { userMessage } from '@skotch/common';
import './ChatMessage.scss';

interface ChatMessagesProps {
  socket: SocketIOClient.Socket;
  yourID: string;
}

const useSocketTextChat = (socket: SocketIOClient.Socket) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<userMessage[]>([]);

  const emitMessage = (e: SyntheticEvent) => {
    e.preventDefault();
    socket.emit('message', input);
    setInput('');
  };

  useEffect(() => {
    socket.on('message', (data: userMessage) => {
      setMessages((m) => [...m, data]);
    });
  }, [socket]);

  return { input, setInput, emitMessage, messages };
};

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  socket,
  yourID,
}) => {
  const { input, setInput, emitMessage, messages } = useSocketTextChat(socket);
  return (
    <div className="message-interface">
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
