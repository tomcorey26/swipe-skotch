import React, { useEffect, useState } from 'react';
import { ChessInstance } from 'chess.js';
import { Piece } from '../Piece/Piece';
import { addBoardPositions } from '../../utils';

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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button onClick={playGame}> Simulate a game!</button>
      <div
        style={{
          width: '640px',
          height: '640px',
          backgroundColor: 'blue',
          display: 'grid',
          gridTemplateColumns: 'repeat(8,80px)',
          gridTemplateRows: 'repeat(8,80px)',
          transform: playerColor === 'b' ? 'rotate(180deg) scaleX(-1)' : '',
        }}
      >
        {board.map((row, j) => {
          return row.map((piece: any, i: number) => (
            <div
              style={{
                backgroundColor:
                  i % 2 === 0
                    ? j % 2 === 0
                      ? 'blue'
                      : 'brown'
                    : j % 2 === 0
                    ? 'brown'
                    : 'blue',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 40,
              }}
              key={`${i}${j}`}
            >
              {piece ? (
                <Piece
                  type={piece.type}
                  color={piece.color}
                  playerColor={playerColor}
                />
              ) : null}
            </div>
          ));
        })}
      </div>
    </div>
  );
};
