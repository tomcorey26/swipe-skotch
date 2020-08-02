import React from 'react';
import './Chess.scss';
import { Board } from './Board/Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useChessState } from '../../context/chess';
import { usePieceSound } from '../../hooks';
import { SideCard } from './SideCard/SideCard';
import { SocketIoProvider } from '../../context/socketIO';
import { VideoChat } from '../../components/VideoChat/VideoChat';

export const ChessGame: React.FC = () => {
  const { board, isCheckmate, playerColor } = useChessState();
  usePieceSound();
  return (
    <SocketIoProvider>
      <div className="container">
        <div className="chess">
          <VideoChat>
            {isCheckmate && (
              <h1 style={{ color: 'green' }}> Check mate bitch</h1>
            )}
            {/* <button onClick={playGame}> Simulate a game!</button> */}

            <DndProvider backend={HTML5Backend}>
              <Board board={board} playerColor={playerColor} />
            </DndProvider>
          </VideoChat>
          <SideCard />
        </div>
      </div>
    </SocketIoProvider>
  );
};
