import React from 'react';
import { ChatMessages } from '../ChatMessages/ChatMessages';
import './Chat.scss';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:4000';

const socket = socketIOClient(ENDPOINT);
interface ChatProps {}
export const Chat: React.FC<ChatProps> = ({}) => {
  return (
    <div className="videochat-interface">
      <div className="videos">
        <div className="video-frame">vid frame 1</div>
        <div className="video-frame">vid frame 2</div>
      </div>
      <ChatMessages socket={socket} />

      <div className="disconnect">disconnect</div>
    </div>
  );
};
