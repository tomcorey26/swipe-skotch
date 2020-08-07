import React from 'react';
import './SideCard.scss';
import { ChatMessages } from '../../../components/ChatMessages/ChatMessages';

interface SideCardProps {}

export const SideCard: React.FC<SideCardProps> = ({}) => {
  return (
    <div className="side-card">
      <div className="action-section"></div>
      <ChatMessages />
    </div>
  );
};
