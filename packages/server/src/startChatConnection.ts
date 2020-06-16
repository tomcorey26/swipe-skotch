import { Socket } from 'socket.io';
import { formatMessage } from '@skotch/common';

export const startChatConnection = (io: any) => {
  io.on('connection', (socket: Socket) => {
    socket.emit(
      'message',
      formatMessage('Tom Cord Bot', 'Welcome to Tom Cord!')
    );

    //socket.broadcast: emits to all clients except for the client connecting
    socket.broadcast.emit(
      'message',
      formatMessage('Tom Cord Bot', 'a user has joined the chat')
    );

    socket.on('message', (data) => {
      //socket: emits to the single client that is connecting
      console.log(data);
      //io: broadcasts to everybody
      io.emit('message', formatMessage('tom', data));
    });

    socket.on('disconnect', () => {
      io.emit('message', formatMessage('TomCord Bot', 'A user disconnected'));
    });
  });
};
