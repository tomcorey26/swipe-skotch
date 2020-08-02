import React from 'react';
import './SideCard.scss';
import socketIOClient from 'socket.io-client';
import { useSocketTextChat } from '../../../hooks';
import { ChatMessages } from '../../../components/ChatMessages/ChatMessages';

interface SideCardProps {}

export const SideCard: React.FC<SideCardProps> = ({}) => {
  return (
    <div className="side-card">
      <ChatMessages />
    </div>
  );
};
