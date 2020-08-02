import { GamePiece, EmptySquare, SquareLabel } from '../Types/chess';
import { ChessInstance } from 'chess.js';
import { State } from '../context/chess';

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
  const color1 = '#58a4b0';
  const color2 = '#BAC1B8';
  if (i % 2 === 0) {
    if (j % 2 === 0) {
      return color1;
    } else {
      return color2;
    }
  } else {
    if (j % 2 !== 0) {
      return color1;
    } else {
      return color2;
    }
  }
};

export const movePiece = (
  from: SquareLabel,
  to: SquareLabel,
  state: State,
  chess: ChessInstance
) => {
  // const moves = chess.moves({ square: from });

  const IsPromotion = chess.move({ from, to, promotion: 'q' });
  const IsMoveLegal = chess.move({ from, to });
  if (!IsMoveLegal && !IsPromotion) {
    console.log('Not a valid movee');
    return { ...state, error: 'not a valid move' };
  }

  const move = IsMoveLegal ? IsMoveLegal : IsPromotion;
  return {
    ...state,
    isCheckmate: chess.in_checkmate(),
    isCheck: chess.in_check(),
    board: addBoardPositions(chess.board()),
    captured: !!move?.captured,
  };
};

export const pieceToUnicode = {
  p: '\u2659',
  n: '\u2658',
  b: '\u2657',
  r: '\u2656',
  q: '\u2655',
  k: '\u2654',
};
