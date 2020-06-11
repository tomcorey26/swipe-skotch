import { message } from './Types/message';

export const foo = (poo: number) => {
  console.log(poo);
  console.log('hello from comomne');
};

export const formatMessage = (username: string, message: string): message => {
  return {
    username,
    text: message,
  };
};

export { message };
