import React, { useEffect, useState } from 'react';
import './Chess.scss';
import { ChessInstance } from 'chess.js';
import { addBoardPositions } from '../../utils';
import { Board } from './Board/Board';
import { DragDropContext } from 'react-beautiful-dnd';

interface ChessProps {}

const chessReq: any = require('chess.js');
const chess: ChessInstance = new chessReq();
export const ChessGame: React.FC<ChessProps> = ({}) => {
  const [board, setBoard] = useState(() => addBoardPositions(chess.board()));
  const [playerColor, setPlayerColor] = useState<'b' | 'w'>('w');
  const [checkmate, setCheckMate] = useState(false);

  useEffect(() => {}, []);

  const playGame = async () => {
    while (!chess.game_over()) {
      const moves = chess.moves();
      const move = moves[Math.floor(Math.random() * moves.length)];
      chess.move(move);
      await new Promise((res) => setTimeout(res, 1000));
      setBoard(addBoardPositions(chess.board()));
    }
  };

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

    setBoard(addBoardPositions(chess.board()));
    if (chess.in_checkmate()) {
      setCheckMate(true);
    }
  };

  return (
    <div className="chess">
      {checkmate && <h1 style={{ color: 'green' }}> Check mate bitch</h1>}
      <button onClick={playGame}> Simulate a game!</button>
      <DragDropContext onDragEnd={movePiece}>
        <Board board={board} playerColor={playerColor} />
      </DragDropContext>
    </div>
  );
};
