import React from 'react';
import './Board.scss';
import { Piece } from '../Piece/Piece';
import { GamePiece } from '../../../Types';
import { getSquareColor } from '../../../utils';

interface BoardProps {
  board: (GamePiece | null)[][];
  playerColor: 'b' | 'w';
}

export const Board: React.FC<BoardProps> = ({ board, playerColor }) => {
  return (
    <div
      className="board"
      style={{
        transform: playerColor === 'b' ? 'rotate(180deg) scaleX(-1)' : '',
      }}
    >
      {board.map((row, j) => {
        return row.map((piece: GamePiece | null, i: number) => (
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
