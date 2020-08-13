import React, { useEffect } from 'react';
import {
  useRouteMatch,
  Switch,
  Route,
  useParams,
  useHistory,
} from 'react-router-dom';
import { Chess } from '../Chess/Chess';
import { ChessProvider } from '../../context/chess';
import { useSocketIoContext } from '../../context/socketIO';
import { socketEvents } from '@skotch/common';

interface GameProps {}

export const Game: React.FC<GameProps> = ({}) => {
  let { path } = useRouteMatch();
  const { socket } = useSocketIoContext();
  let { roomId } = useParams();
  const history = useHistory();
  useEffect(() => {
    socket.emit(socketEvents.JOIN_ROOM, roomId);
    socket.on(socketEvents.LOBBY_FULL, () => history.push('/'));
  }, [socket, roomId, history]);
  return (
    <div className="game">
      <Switch>
        <Route exact path={path}>
          <h3>choose a game</h3>
        </Route>

        <Route path={`${path}/chess`}>
          <ChessProvider>
            <Chess />
          </ChessProvider>
        </Route>
      </Switch>
    </div>
  );
};
