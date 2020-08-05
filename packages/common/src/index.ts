import { userMessage } from './Types';
import moment from 'moment';

export const formatMessage = (
  username: string,
  message: string
): userMessage => {
  return {
    username,
    text: message,
    dateCreated: moment().format('h:mm a'),
  };
};

export const socketEvents = {
  ENEMY_MOVE: 'enemyMove',
  MY_MOVE: 'chessMove',
  JOIN_ROOM: 'join-room',
  USER_CONNECTED: 'user-connected',
  CONNECT_PEER: 'connect_peer',
  CONNECT_REQUEST: 'connect_request',
  LOBBY_FULL: 'lobby-full',
};

export { userMessage };
