import React, { useState, Dispatch, SetStateAction, ChangeEvent } from 'react';
import './SideCard.scss';
import { ChatMessages } from '../../../components/ChatMessages/ChatMessages';
import { useSocketIO } from '../../../hooks';
import { socketEvents, GameType, GamesArray } from '@skotch/common';
import { CopyLink } from '../../../components/CopyLink/CopyLink';

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
  const [gameType, setGameType] = useState<GameType>(GameType.CHESS);
  const { socket } = useSocketIO();
  return (
    <div className="side-card">
      <div className="action-section">
        <div className="select-game">
          <h4>Choose Game</h4>
          <select
            value={gameType}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setGameType(Number(e.target.value))
            }
          >
            {GamesArray.map((game) => (
              <option value={game.enum}>{game.name}</option>
            ))}
          </select>
        </div>
        {connectedCount >= 1 && !gameActive && (
          <div
            className="btn-primary"
            onClick={() => {
              socket.emit(socketEvents.START_GAME, GameType.CHESS, roomId);
              setGameActive(true);
            }}
          >
            New Game
          </div>
        )}
        {connectedCount < 1 && <CopyLink />}
      </div>
      <ChatMessages />
    </div>
  );
};
