import { GamePiece, EmptySquare } from '../Types/chess';

export const addBoardPositions = (
  board: any[]
): (GamePiece | EmptySquare)[][] => {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const nums = ['1', '2', '3', '4', '5', '6', '7', '8'].reverse();

  let boardWithPosition = board.map((row, i) =>
    row.map((square: any, j: number) => {
      return { ...square, position: letters[j] + nums[i] };
    })
  );

  return boardWithPosition;
};

export const getSquareColor = (i: number, j: number) => {
  if (i % 2 === 0) {
    if (j % 2 === 0) {
      return 'white';
    } else {
      return 'orange';
    }
  } else {
    if (j % 2 !== 0) {
      return 'white';
    } else {
      return 'orange';
    }
  }
};

export const pieceToUnicode = {
  p: '\u2659',
  n: '\u2658',
  b: '\u2657',
  r: '\u2656',
  q: '\u2655',
  k: '\u2654',
};
