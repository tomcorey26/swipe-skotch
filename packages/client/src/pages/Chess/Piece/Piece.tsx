import React from 'react';
import './Piece.scss';
import { PieceType } from 'chess.js';

interface PieceProps {
  type: PieceType;
  color: 'b' | 'w';
  playerColor: 'b' | 'w';
}

export const Piece: React.FC<PieceProps> = ({ color, type, playerColor }) => {
  const map = {
    p: '\u2659',
    n: '\u2658',
    b: '\u2657',
    r: '\u2656',
    q: '\u2655',
    k: '\u2654',
  };
  const isBlack = color === 'b';
  return (
    <div className="piece">
      <h1
        style={{
          color: isBlack ? 'black' : 'white',
          transform: playerColor === 'b' ? 'rotate(180deg) scaleX(-1)' : '',
        }}
      >
        {map[type]}
      </h1>
    </div>
  );
};
