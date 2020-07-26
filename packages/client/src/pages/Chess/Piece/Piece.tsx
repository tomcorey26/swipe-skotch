import React from 'react';
import './Piece.scss';
import { PieceType } from 'chess.js';
import { GamePiece } from '../../../Types';
import { Draggable } from 'react-beautiful-dnd';

type PieceProps = GamePiece & { playerColor: 'b' | 'w' } & { index: number };
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
  index,
}) => {
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
    <Draggable draggableId={position} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className="piece"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <h1
              style={{
                userSelect: 'none',
                color: isBlack ? 'black' : 'white',
                transform:
                  playerColor === 'b' ? 'rotate(180deg) scaleX(-1)' : '',
              }}
            >
              {map[type]}
            </h1>
          </div>
        );
      }}
    </Draggable>
  );
};
