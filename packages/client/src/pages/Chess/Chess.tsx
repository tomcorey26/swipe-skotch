import React, { useEffect } from 'react';
import './Chess.scss';
import { Board } from './Board/Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useChessState, useChessDispatch } from '../../context/chess';
import { usePieceSound } from '../../hooks';
import { SideCard } from './SideCard/SideCard';
import { useSocketIoContext } from '../../context/socketIO';
import { VideoChat } from '../../components/VideoChat/VideoChat';
import { socketEvents } from '@skotch/common';
import { ChessMove } from '@skotch/common/dist/Types';
import { useParams, useHistory } from 'react-router-dom';

export const ChessGame: React.FC = () => {
  const { board, isCheckmate, playerColor } = useChessState();
  const dispatch = useChessDispatch();
  const { socket } = useSocketIoContext();
  usePieceSound();
  let { roomId } = useParams();
  const history = useHistory();

  useEffect(() => {
    socket.emit(socketEvents.JOIN_ROOM, roomId);
    socket.on(socketEvents.ENEMY_MOVE, (move: ChessMove) => {
      dispatch({ type: 'move_piece', payload: move });
    });
    socket.on(socketEvents.LOBBY_FULL, () => history.push('/'));
  }, [socket, dispatch, roomId, history]);

  return (
    <div className="container">
      <div className="chess">
        <div className="spectators">
          <div className="spectator"></div>
        </div>
        <VideoChat>
          {isCheckmate && <h1 style={{ color: 'green' }}> Check mate bitch</h1>}
          {/* <button onClick={playGame}> Simulate a game!</button> */}

          <DndProvider backend={HTML5Backend}>
            <Board board={board} playerColor={playerColor} />
          </DndProvider>
        </VideoChat>
        <SideCard />
      </div>
    </div>
  );
};
