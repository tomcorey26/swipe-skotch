import React from 'react';
import './Square.scss';
import { useDrop } from 'react-dnd';
import { SquareLabel } from '../../../Types';

interface SquareProps {
  color: string;
  position: SquareLabel;
}

export const Square: React.FC<SquareProps> = ({
  children,
  color,
  position,
}) => {
  // const [{ pieceType }, drop] = useDrop({
  //   accept: pieceType,
  //   drop: () => moveKnight(x, y),
  //   collect: (mon) => ({
  //     pieceType: mon.getItem(),
  //   }),
  // });
  return (
    <div
      className="square"
      style={{
        backgroundColor: color,
      }}
    >
      {children}
    </div>
  );
};
