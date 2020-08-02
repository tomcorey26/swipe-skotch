import React from 'react';
import './Chess.scss';
import { Board } from './Board/Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useChessState } from '../../context/chess';
import { useSocketIO, usePieceSound } from '../../hooks';
import { SideCard } from './SideCard/SideCard';

interface ChessProps {}
export const ChessGame: React.FC<ChessProps> = ({}) => {
  const { board, isCheckmate, playerColor } = useChessState();
  usePieceSound();
  const { socket, users, yourID } = useSocketIO();
  return (
    <div className="container">
      <div className="chess">
        {isCheckmate && <h1 style={{ color: 'green' }}> Check mate bitch</h1>}
        {/* <button onClick={playGame}> Simulate a game!</button> */}

        <DndProvider backend={HTML5Backend}>
          <Board board={board} playerColor={playerColor} />
        </DndProvider>
        <SideCard socket={socket} />
      </div>
    </div>
  );
};
