import React from 'react';
import './Board.scss';
import { PieceType } from 'chess.js';
import { Piece } from '../Piece/Piece';

interface BoardProps {
  board: ({
    type: PieceType;
    color: 'b' | 'w';
  } | null)[][];
  playerColor: 'b' | 'w';
}

export const Board: React.FC<BoardProps> = ({ board, playerColor }) => {
  const getSquareColor = (i: number, j: number) => {
    if (i % 2 === 0) {
      if (j % 2 === 0) {
        return 'white';
      } else {
        return 'yellow';
      }
    } else {
      if (j % 2 !== 0) {
        return 'white';
      } else {
        return 'yellow';
      }
    }
  };

  return (
    <div
      className="board"
      style={{
        transform: playerColor === 'b' ? 'rotate(180deg) scaleX(-1)' : '',
      }}
    >
      {board.map((row, j) => {
        return row.map((piece: any, i: number) => (
          <div
            className="square"
            style={{ backgroundColor: getSquareColor(i, j) }}
          >
            {piece ? (
              <Piece
                key={`${i}${j}`}
                type={piece.type}
                color={piece.color}
                playerColor={playerColor}
              />
            ) : null}
          </div>
        ));
      })}
    </div>
  );
};
