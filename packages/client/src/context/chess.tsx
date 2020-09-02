import React from 'react';
import { ChessInstance } from 'chess.js';
import { addBoardPositions } from '../utils';
import { ChessBoard, SquareLabel } from '../Types';
import { ChessPlayer } from '@skotch/common';
const chessReq: any = require('chess.js');

type Action =
  | { type: 'set_board'; payload: ChessBoard }
  | { type: 'set_checkmate' }
  | {
      type: 'move_piece';
      payload: { from: SquareLabel; to: SquareLabel; setGlobalMessage?: any };
    }
  | {
      type: 'begin_game';
      payload: { players: ChessPlayer[]; socketId: string };
    }
  | { type: 'clear_game' };

type Dispatch = (action: Action) => void;

//player joined?
export type State = {
  board: any;
  fen: string;
  playerColor: 'b' | 'w';
  isCheckmate: boolean;
  isCheck: boolean;
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

const prestineChessGame = () => {
  const chess: ChessInstance = new chessReq();
  return {
    board: addBoardPositions(chess.board()),
    fen: chess.fen(),
    isCheckmate: false,
    isCheck: false,
    error: '',
    captured: false,
    lastMove: null,
    players: null,
    playerTurn: 0 as 0,
  };
};

const movePiece = (
  from: SquareLabel,
  to: SquareLabel,
  fen: string,
  turn: 0 | 1
) => {
  const chess: ChessInstance = new chessReq(fen);
  // const moves = chess.moves({ square: from });
  const IsMoveLegal = chess.move({ from, to });
  const IsPromotion = chess.move({ from, to, promotion: 'q' });

  if (!IsMoveLegal && !IsPromotion) {
    console.log('Not a valid movee');
    return { error: 'not a valid move' };
  }

  const move = IsMoveLegal ? IsMoveLegal : IsPromotion;
  return {
    lastMove: { from, to },
    playerTurn: (turn === 0 ? 1 : 0) as 0 | 1,
    isCheckmate: chess.in_checkmate(),
    isCheck: chess.in_check(),
    board: addBoardPositions(chess.board()),
    captured: !!move?.captured,
    fen: chess.fen(),
  };
};

const chessReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'clear_game': {
      return { ...state, ...prestineChessGame() };
    }
    case 'set_board': {
      return { ...state, board: action.payload };
    }
    case 'set_checkmate': {
      return { ...state, isCheckmate: true };
    }
    case 'move_piece': {
      const chessState = movePiece(
        action.payload.from,
        action.payload.to,
        state.fen,
        state.playerTurn
      );
      if (chessState.error && action.payload.setGlobalMessage) {
        action.payload.setGlobalMessage({
          type: 'error',
          msg: chessState.error,
        });
      }
      return {
        ...state,
        ...chessState,
      };
    }
    case 'begin_game': {
      return {
        ...state,
        ...prestineChessGame(),
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
  const chess: ChessInstance = new chessReq();
  const [state, dispatch] = React.useReducer(chessReducer, {
    board: addBoardPositions(chess.board()),
    fen: chess.fen(),
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
