import React, { useRef, useEffect } from 'react';
import './ChatMessage.scss';
import { useSocketTextChat } from '../../hooks';
import { useSocketIoContext } from '../../context/socketIO';
import { socketEvents } from '@skotch/common';

interface ChatMessagesProps {}

let renderCount = 0;
export const ChatMessages: React.FC<ChatMessagesProps> = () => {
  const { name, socket } = useSocketIoContext();
  const {
    input,
    setInput,
    emitMessage,
    messages,
    setMessages,
  } = useSocketTextChat();
  const messagesEnd = useRef<HTMLDivElement | null>();
  const scrollToBottom = () => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (renderCount < 6) {
    renderCount++;
  }

  useEffect(() => {
    // ghetto ass way of making sure the effect doesnt happen
    // when you first join the lobby
    if (renderCount > 5) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    socket.on(socketEvents.BEGIN_CHESS, () => {
      setMessages((msgs) => [
        ...msgs,
        { username: 'Bot', dateCreated: 'now', text: 'Chess Game started' },
      ]);
    });
  }, [socket, setMessages]);

  return (
    <>
      <div className="chat-log">
        <ul className="message-list">
          {messages.map((msg, i) => {
            let classType;
            if (msg.username === name) {
              classType = 'from-me';
            } else if (msg.username === 'Bot') {
              classType = 'from-bot';
            } else if (msg.username === 'Error') {
              classType = 'from-error';
            } else {
              classType = 'to-me';
            }
            return (
              <li key={i} className={classType + ' fade-in'}>
                {msg.username}: {msg.text}
              </li>
            );
          })}
        </ul>
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={(el) => {
            messagesEnd.current = el;
          }}
        ></div>
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
