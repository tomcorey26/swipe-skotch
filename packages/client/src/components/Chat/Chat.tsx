import React, { useState, useEffect, SyntheticEvent } from 'react';
import { ChatLog } from '../ChatLog/ChatLog';
import { ChatMessages } from '../ChatMessages/ChatMessages';
import socketIOClient from 'socket.io-client';
import './Chat.scss';
const ENDPOINT = 'http://localhost:4000';

const socket = socketIOClient(ENDPOINT);
interface ChatProps {}
export const Chat: React.FC<ChatProps> = ({}) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on('message', (data: { message: string }) => {
      console.log(data);
      setMessages((m) => [...m, data.message]);
    });
  }, []);

  const emitMessage = (e: SyntheticEvent) => {
    e.preventDefault();
    socket.emit('message', text);
    setText('');
  };
  return (
    <div className="container">
      <div className="center chat">foo</div>
    </div>
  );
};
