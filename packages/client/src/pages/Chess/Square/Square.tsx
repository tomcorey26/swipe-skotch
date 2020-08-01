import React from 'react';
import './Square.scss';
import { useDrop } from 'react-dnd';
import { SquareLabel } from '../../../Types';
import { useChessDispatch } from '../context';
import { monitorEventLoopDelay } from 'perf_hooks';

interface SquareProps {
  color: string;
  position: SquareLabel;
}

export const Square: React.FC<SquareProps> = ({
  children,
  color,
  position,
}) => {
  const dispatch = useChessDispatch();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'piece',
    drop: (_, draggable) => {
      dispatch({
        type: 'move_piece',
        payload: { from: draggable.getItem().position, to: position },
      });
    },
    canDrop: (_, mon) => mon.getItem().position !== position,
    collect: (mon) => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });
  //use css property background img for chess piece
  return (
    <div
      className="square"
      ref={drop}
      style={{
        backgroundColor: isOver && canDrop ? 'lightblue' : color,
      }}
    >
      {children}
    </div>
  );
};
