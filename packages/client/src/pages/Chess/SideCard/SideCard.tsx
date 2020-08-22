import React, { useState, Dispatch, SetStateAction } from 'react';
import './SideCard.scss';
import { ChatMessages } from '../../../components/ChatMessages/ChatMessages';
import { useSocketIO } from '../../../hooks';
import { socketEvents, GameType } from '@skotch/common';

interface SideCardProps {
  connectedCount: number;
  roomId: string;
  gameActive: boolean;
  setGameActive: Dispatch<SetStateAction<boolean>>;
}

export const SideCard: React.FC<SideCardProps> = ({
  connectedCount,
  roomId,
  gameActive,
  setGameActive,
}) => {
  const { socket } = useSocketIO();
  return (
    <div className="side-card">
      <div className="action-section">
        {connectedCount >= 1 && !gameActive && (
          <div
            className="btn-primary"
            onClick={() => {
              socket.emit(socketEvents.START_GAME, GameType.CHESS, roomId);
              setGameActive(true);
            }}
          >
            Start
          </div>
        )}
      </div>
      <ChatMessages />
    </div>
  );
};
