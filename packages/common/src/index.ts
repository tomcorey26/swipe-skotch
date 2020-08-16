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
  ALL_USERS: 'all-users',
  SEND_SIGNAL: 'send-signal',
  RETURN_SIGNAL: 'return-signal',
  USER_JOINED: 'user-joined',
  RECIEVE_RETURN_SIGNAL: 'recieve-return-signal',
  DISCONNECT: 'disconnect',
};

export { userMessage };
