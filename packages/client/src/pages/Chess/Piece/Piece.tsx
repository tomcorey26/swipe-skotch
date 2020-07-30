import React from 'react';
import './Piece.scss';
import { PieceType } from 'chess.js';
import { GamePiece } from '../../../Types';
import { useDrag, DragLayerMonitor } from 'react-dnd';
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
    item: { type: 'piece', position },
    collect: (monitor: DragLayerMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const isBlack = color === 'b';

  return (
    <div
      className="piece"
      ref={drag}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <h1
        style={{
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
