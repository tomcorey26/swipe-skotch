import React from 'react';
import { ChessInstance } from 'chess.js';
import { addBoardPositions } from '../utils';
import { ChessBoard, SquareLabel } from '../Types';
import { ChessPlayer } from '@skotch/common';
const chessReq: any = require('chess.js');

type Action =
  | { type: 'set_board'; payload: ChessBoard }
  | { type: 'set_checkmate' }
  | { type: 'move_piece'; payload: { from: SquareLabel; to: SquareLabel } }
  | {
      type: 'begin_game';
      payload: { players: ChessPlayer[]; socketId: string };
    };

type Dispatch = (action: Action) => void;

//player joined?
export type State = {
  board: any;
  playerColor: 'b' | 'w';
  isCheckmate: boolean;
  isCheck: boolean;
  chess: ChessInstance;
  error: string;
  captured: boolean;
  lastMove: { from: SquareLabel; to: SquareLabel } | null;
  userCount: number;
  playerTurn: 0 | 1;
  players: ChessPlayer[] | null;
};

type ChessProviderProps = { children: React.ReactNode };

const ChessStateContext = React.createContext<State | undefined>(undefined);

const ChessDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

const chess: ChessInstance = new chessReq();

const movePiece = (
  from: SquareLabel,
  to: SquareLabel,
  chess: ChessInstance
) => {
  // const moves = chess.moves({ square: from });
  console.log('in move piece', from, to);
  const IsMoveLegal = chess.move({ from, to });
  const IsPromotion = chess.move({ from, to, promotion: 'q' });

  if (!IsMoveLegal && !IsPromotion) {
    console.log('Not a valid movee');
    return { error: 'not a valid move' };
  }

  const move = IsMoveLegal ? IsMoveLegal : IsPromotion;
  return {
    lastMove: { from, to },
    isCheckmate: chess.in_checkmate(),
    isCheck: chess.in_check(),
    board: addBoardPositions(chess.board()),
    captured: !!move?.captured,
  };
};

const chessReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set_board': {
      return { ...state, board: action.payload };
    }
    case 'set_checkmate': {
      return { ...state, isCheckmate: true };
    }
    case 'move_piece': {
      console.log('move piece reducer', action.payload.from, action.payload.to);
      const chessState = movePiece(
        action.payload.from,
        action.payload.to,
        chess
      );
      return {
        ...state,
        playerTurn: (state.playerTurn === 0 ? 1 : 0) as 0 | 1,
        ...chessState,
      };
    }
    case 'begin_game': {
      return {
        ...state,
        players: action.payload.players,
        playerColor: (action.payload.players[1].id === action.payload.socketId
          ? 'b'
          : 'w') as 'b' | 'w',
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
};

function ChessProvider({ children }: ChessProviderProps) {
  const [state, dispatch] = React.useReducer(chessReducer, {
    chess,
    board: addBoardPositions(chess.board()),
    playerColor: 'w',
    isCheckmate: false,
    isCheck: false,
    error: '',
    captured: false,
    lastMove: null,
    userCount: 0,
    playerTurn: 0,
    players: null,
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
