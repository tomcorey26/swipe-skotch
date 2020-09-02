import React from 'react';
import './Piece.scss';
import { PieceType } from 'chess.js';
import { GamePiece } from '../../../Types';
import { useDrag, DragLayerMonitor } from 'react-dnd';
import { pieceToUnicode } from '../../../utils';
const whiteKing = require('../../../assets/Chess_klt45.svg');
const whiteQueen = require('../../../assets/Chess_qlt45.svg');
const whiteRook = require('../../../assets/Chess_rlt45.svg');
const whiteBishop = require('../../../assets/Chess_blt45.svg');
const whiteKnight = require('../../../assets/Chess_nlt45.svg');
const whitePawn = require('../../../assets/Chess_plt45.svg');

const blackKing = require('../../../assets/Chess_kdt45.svg');
const blackQueen = require('../../../assets/Chess_qdt45.svg');
const blackRook = require('../../../assets/Chess_rdt45.svg');
const blackBishop = require('../../../assets/Chess_bdt45.svg');
const blackKnight = require('../../../assets/Chess_ndt45.svg');
const blackPawn = require('../../../assets/Chess_pdt45.svg');

type PieceProps = GamePiece & { playerColor: 'b' | 'w' };
// {
//   type: PieceType;
//   color: 'b' | 'w';
//   playerColor: 'b' | 'w';
// }
const whitePieces = {
  p: whitePawn,
  n: whiteKnight,
  b: whiteBishop,
  r: whiteRook,
  q: whiteQueen,
  k: whiteKing,
};
const blackPieces = {
  p: blackPawn,
  n: blackKnight,
  b: blackBishop,
  r: blackRook,
  q: blackQueen,
  k: blackKing,
};

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
  const getCorrectImage = () => {
    if (isBlack) {
      return blackPieces[type];
    } else {
      return whitePieces[type];
    }
  };
  return (
    <div
      className="piece"
      ref={drag}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        opacity: isDragging ? 0 : 1,
        backgroundImage: `url(${getCorrectImage()})`,
        transform:
          playerColor === 'b'
            ? `rotate(180deg) ${type === 'n' ? 'scaleX(-1)' : ''}`
            : 'rotate(0)',
      }}
    ></div>
  );
};
