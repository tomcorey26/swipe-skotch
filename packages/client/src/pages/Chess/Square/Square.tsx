import React from 'react';
import './Square.scss';
import { useDrop } from 'react-dnd';
import { SquareLabel } from '../../../Types';
import { useChessDispatch } from '../../../context/chess';
import { useSocketIoContext } from '../../../context/socketIO';
import { socketEvents } from '@skotch/common';

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
  const { socket } = useSocketIoContext();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'piece',
    drop: (_, draggable) => {
      const from = draggable.getItem().position;
      const to = position;
      dispatch({
        type: 'move_piece',
        payload: { from, to },
      });
      socket.emit(socketEvents.MY_MOVE, { from, to });
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
