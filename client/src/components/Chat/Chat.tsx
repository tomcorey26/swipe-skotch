import React from 'react';
import { ChatLog } from '../ChatLog/ChatLog';
import { ChatMessages } from '../ChatMessages/ChatMessages';
import './Chat.scss';

interface ChatProps {}

export const Chat: React.FC<ChatProps> = ({}) => {
  return (
    <div className="center chat">
      <ChatMessages />
      <ChatLog />
    </div>
  );
};
