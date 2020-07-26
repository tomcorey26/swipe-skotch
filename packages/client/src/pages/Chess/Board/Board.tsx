import React from 'react';
import './Board.scss';
import { Piece } from '../Piece/Piece';
import { GamePiece, EmptySquare } from '../../../Types';
import { getSquareColor } from '../../../utils';
import { Droppable } from 'react-beautiful-dnd';

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
          <Droppable droppableId={square.position}>
            {(provided, snapshot) => {
              return (
                <div
                  className="square"
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? 'lightblue'
                      : getSquareColor(i, j),
                  }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  key={i * j + j + 1000}
                >
                  {'type' in square ? (
                    <Piece
                      key={square.position}
                      {...square}
                      playerColor={playerColor}
                      index={i * j + j}
                    />
                  ) : null}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        ));
      })}
    </div>
  );
};
