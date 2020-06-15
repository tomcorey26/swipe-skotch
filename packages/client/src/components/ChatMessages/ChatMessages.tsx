import React from 'react';
import './ChatMessage.scss';
interface ChatMessagesProps {}

export const ChatMessages: React.FC<ChatMessagesProps> = () => {
  let test = true;
  return (
    <>
      <div className="message-interface">
        <div className="chat-log">
          <ul className="message-list">
            <li className="from-me">foo</li>
            <li className="to-me">foo</li>
          </ul>
        </div>

        <div className="chat-input">
          <input
            id="vid-chat-input"
            className="sk-input"
            type="text"
            placeholder="Type a message here"
          />
          <button className="sk-button-primary">SEND</button>
        </div>
      </div>
    </>
  );
};
