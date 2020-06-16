import { userMessage } from './Types';
import moment from 'moment';

export const foo = (poo: number) => {
  console.log(poo);
  console.log('hello from comomne');
};

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

export { userMessage };
