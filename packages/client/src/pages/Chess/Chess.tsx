import React, { useEffect, useRef } from 'react';
import './Chess.scss';
import { Board } from './Board/Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useChessState } from './context';
import { usePieceSound } from './Hooks';

interface ChessProps {}

export const ChessGame: React.FC<ChessProps> = ({}) => {
  const { board, isCheckmate, playerColor } = useChessState();
  usePieceSound();
  // const playGame = async () => {
  //   while (!chess.game_over()) {
  //     const moves = chess.moves();
  //     const move = moves[Math.floor(Math.random() * moves.length)];
  //     chess.move(move);
  //     await new Promise((res) => setTimeout(res, 1000));
  //     setBoard(addBoardPositions(chess.board()));
  //   }
  // };

  return (
    <div className="chess">
      {isCheckmate && <h1 style={{ color: 'green' }}> Check mate bitch</h1>}
      {/* <button onClick={playGame}> Simulate a game!</button> */}

      <DndProvider backend={HTML5Backend}>
        <Board board={board} playerColor={playerColor} />
      </DndProvider>
    </div>
  );
};
