import ioserver, { Socket } from 'socket.io';
import { formatMessage } from '@skotch/common';

const botName: string = 'TomCord Bot';
export const initTextChat = (socket: Socket, io: ioserver.Server) => {
  // messages
  socket.emit('message', formatMessage(botName, 'Welcome to Tom Cord!'));
  //socket.broadcast: emits to all clients except for the client connecting
  socket.broadcast.emit(
    'message',
    formatMessage(botName, 'a user has joined the chat')
  );
  socket.on('message', (data) => {
    //socket: emits to the single client that is connecting
    console.log(data);
    //io: broadcasts to everybody
    io.emit('message', formatMessage('tom', data));
  });
};
