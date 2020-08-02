import React from 'react';
import './SideCard.scss';
import socketIOClient from 'socket.io-client';
import { useSocketTextChat } from '../../../hooks';
import { ChatMessages } from '../../../components/ChatMessages/ChatMessages';

interface SideCardProps {
  socket: SocketIOClient.Socket;
}

export const SideCard: React.FC<SideCardProps> = ({ socket }) => {
  return (
    <div className="side-card">
      {/* <ChatMessages socket={socket} /> */}
      <h1>foo</h1>
    </div>
  );
};
