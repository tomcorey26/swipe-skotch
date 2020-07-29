import React, { useEffect, useState } from 'react';
import './Chess.scss';
import { Board } from './Board/Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useChessState, useChessDispatch } from './context';
import { addBoardPositions } from '../../utils';

interface ChessProps {}

export const ChessGame: React.FC<ChessProps> = ({}) => {
  const { board, isCheckmate, playerColor, chess } = useChessState();
  const dispatch = useChessDispatch();

  // const playGame = async () => {
  //   while (!chess.game_over()) {
  //     const moves = chess.moves();
  //     const move = moves[Math.floor(Math.random() * moves.length)];
  //     chess.move(move);
  //     await new Promise((res) => setTimeout(res, 1000));
  //     setBoard(addBoardPositions(chess.board()));
  //   }
  // };

  const movePiece = (result: any) => {
    if (!result.destination) return;
    const from = result.draggableId;
    const dest = result.destination.droppableId;
    const moves = chess.moves({ square: from });

    const IsMoveLegal = chess.move({ from: from, to: dest });
    if (!IsMoveLegal) {
      console.log('Not a valid movee');
      return;
    }

    dispatch({ type: 'set_board', payload: addBoardPositions(chess.board()) });
    if (chess.in_checkmate()) {
      dispatch({ type: 'set_checkmate' });
    }
  };

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
