import React, { useEffect, Dispatch, SetStateAction, useState } from 'react';
import './Chess.scss';
import { Board } from './Board/Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useChessState, useChessDispatch } from '../../context/chess';
import { usePieceSound } from '../../hooks';
import { useSocketIoContext } from '../../context/socketIO';
import { socketEvents, ChessPlayer } from '@skotch/common';
import { ChessMove } from '@skotch/common/dist/Types';

interface ChessProps {
  setGameActive: Dispatch<SetStateAction<boolean>>;
}
export const Chess: React.FC<ChessProps> = ({ setGameActive }) => {
  const { board, isCheckmate, playerColor, playerTurn } = useChessState();
  const dispatch = useChessDispatch();
  const { socket, yourID } = useSocketIoContext();
  const [winner, setWinner] = useState<null | 'White' | 'Black'>(null);
  usePieceSound();

  useEffect(() => {
    if (isCheckmate) {
      setGameActive(false);
      if (playerTurn === 0) {
        setWinner('Black');
      } else {
        setWinner('White');
      }
    }
  }, [isCheckmate, setGameActive]);

  useEffect(() => {
    socket.on(socketEvents.ENEMY_MOVE, (move: ChessMove) => {
      console.log('enemy move');
      dispatch({ type: 'move_piece', payload: move });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on(socketEvents.BEGIN_CHESS, (data: { players: ChessPlayer[] }) => {
      setGameActive(true);
      dispatch({
        type: 'begin_game',
        payload: { players: data.players, socketId: yourID.current },
      });
    });
  }, []);

  return (
    <div className="chess">
      {/* <VideoChat> */}
      {isCheckmate && <h1 style={{ color: 'green' }}>{winner} Wins!</h1>}
      {/* <button onClick={playGame}> Simulate a game!</button> */}

      <DndProvider backend={HTML5Backend}>
        <Board board={board} playerColor={playerColor} />
      </DndProvider>
      {/* </VideoChat> */}
    </div>
  );
};
