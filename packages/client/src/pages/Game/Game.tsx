import React, { useEffect } from 'react';
import './Game.scss';
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
import { SideCard } from '../Chess/SideCard/SideCard';

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
    <div className="container">
      <div className="game">
        <div className="spectators">
          <div className="spectator"></div>
        </div>
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
        <SideCard />
      </div>
    </div>
  );
};
