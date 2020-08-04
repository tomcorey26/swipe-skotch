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
};

export { userMessage };
