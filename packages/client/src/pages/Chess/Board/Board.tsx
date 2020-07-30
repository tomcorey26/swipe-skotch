import React from 'react';
import './Board.scss';
import { Piece } from '../Piece/Piece';
import { GamePiece, EmptySquare } from '../../../Types';
import { getSquareColor } from '../../../utils';
import { Square } from '../Square/Square';

interface BoardProps {
  board: (GamePiece | EmptySquare)[][];
  playerColor: 'b' | 'w';
}

export const Board: React.FC<BoardProps> = ({ board, playerColor }) => {
  // prettier-ignore
  const BOARD_ORIENTATION = playerColor === 'b' ? 'rotate(180deg) scaleX(-1)' : '';
  return (
    <div
      className="board"
      style={{
        transform: BOARD_ORIENTATION,
      }}
    >
      {board.map((row, j) => {
        return row.map((square: GamePiece | EmptySquare, i: number) => (
          <Square
            color={getSquareColor(i, j)}
            position={square.position}
            key={square.position}
          >
            {'type' in square ? (
              <Piece {...square} playerColor={playerColor} />
            ) : null}
          </Square>
        ));
      })}
    </div>
  );
};
