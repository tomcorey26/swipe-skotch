import React from 'react';
import { ChessInstance } from 'chess.js';
import { addBoardPositions, movePiece } from '../../utils';
import { ChessBoard, SquareLabel } from '../../Types';

type Action =
  | { type: 'set_board'; payload: ChessBoard }
  | { type: 'set_checkmate' }
  | { type: 'move_piece'; payload: { from: SquareLabel; to: SquareLabel } };

type Dispatch = (action: Action) => void;

export type State = {
  board: any;
  playerColor: 'b' | 'w';
  isCheckmate: boolean;
  chess: ChessInstance;
  error: string;
};

type ChessProviderProps = { children: React.ReactNode };

const ChessStateContext = React.createContext<State | undefined>(undefined);

const ChessDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);
function chessReducer(state: State, action: Action) {
  switch (action.type) {
    case 'set_board': {
      return { ...state, board: action.payload };
    }
    case 'set_checkmate': {
      return { ...state, isCheckmate: true };
    }
    case 'move_piece': {
      console.log(action.payload);
      return movePiece(action.payload.from, action.payload.to, state, chess);
    }
    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
}

const chessReq: any = require('chess.js');
const chess: ChessInstance = new chessReq();
function ChessProvider({ children }: ChessProviderProps) {
  const [state, dispatch] = React.useReducer(chessReducer, {
    chess,
    board: addBoardPositions(chess.board()),
    playerColor: 'w',
    isCheckmate: false,
    error: '',
  });
  return (
    <ChessStateContext.Provider value={state}>
      <ChessDispatchContext.Provider value={dispatch}>
        {children}
      </ChessDispatchContext.Provider>
    </ChessStateContext.Provider>
  );
}
function useChessState() {
  const context = React.useContext(ChessStateContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
}
function useChessDispatch() {
  const context = React.useContext(ChessDispatchContext);
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider');
  }
  return context;
}
export { ChessProvider, useChessState, useChessDispatch };
