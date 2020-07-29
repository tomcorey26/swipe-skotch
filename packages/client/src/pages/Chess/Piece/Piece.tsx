import React from 'react';
import './Piece.scss';
import { PieceType } from 'chess.js';
import { GamePiece } from '../../../Types';
import { Draggable } from 'react-beautiful-dnd';
import { useDrag } from 'react-dnd';
import { pieceToUnicode } from '../../../utils';

type PieceProps = GamePiece & { playerColor: 'b' | 'w' };
// {
//   type: PieceType;
//   color: 'b' | 'w';
//   playerColor: 'b' | 'w';
// }

export const Piece: React.FC<PieceProps> = ({
  color,
  type,
  position,
  playerColor,
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type, position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const isBlack = color === 'b';

  return (
    <div className="piece" ref={drag}>
      <h1
        style={{
          opacity: isDragging ? 0.8 : 1,
          userSelect: 'none',
          color: isBlack ? 'black' : 'white',
          transform: playerColor === 'b' ? 'rotate(180deg) scaleX(-1)' : '',
        }}
      >
        {pieceToUnicode[type]}
      </h1>
    </div>
  );
};
