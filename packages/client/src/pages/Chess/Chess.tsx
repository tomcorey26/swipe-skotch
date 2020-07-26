import React, { useEffect, useState } from 'react';
import './Chess.scss';
import { ChessInstance } from 'chess.js';
import { Piece } from './Piece/Piece';
import { addBoardPositions } from '../../utils';
import { Board } from './Board/Board';

interface ChessProps {}

const chessReq: any = require('chess.js');
const chess: ChessInstance = new chessReq();
export const ChessGame: React.FC<ChessProps> = ({}) => {
  const [board, setBoard] = useState(() => addBoardPositions(chess.board()));
  const [playerColor, setPlayerColor] = useState<'b' | 'w'>('w');

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

  return (
    <div className="chess">
      <button onClick={playGame}> Simulate a game!</button>
      <Board board={board} playerColor={playerColor} />
    </div>
  );
};
