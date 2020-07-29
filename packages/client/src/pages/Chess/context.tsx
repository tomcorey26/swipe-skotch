import React from 'react';
import { ChessInstance } from 'chess.js';
import { addBoardPositions } from '../../utils';
import { ChessBoard } from '../../Types';

type Action =
  | { type: 'set_board'; payload: ChessBoard }
  | { type: 'set_checkmate' };

type Dispatch = (action: Action) => void;

type State = {
  board: any;
  playerColor: 'b' | 'w';
  isCheckmate: boolean;
  chess: ChessInstance;
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
