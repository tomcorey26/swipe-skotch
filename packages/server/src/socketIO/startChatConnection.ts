import { Socket } from 'socket.io';
import { formatMessage } from '@skotch/common';
import ioserver from 'socket.io';
import { startChessMultiplayer } from './startChessMultiplayer';

const users: any = {};

const botName: string = 'TomCord Bot';
const initTextChat = (socket: Socket, io: ioserver.Server) => {
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

const initVideoChat = (socket: Socket, io: ioserver.Server) => {
  //video chat start
  socket.on('callUser', (data) => {
    //io to lets you only emit something to the user with the passed socket id
    io.to(data.userToCall).emit('hey', {
      signal: data.signalData,
      from: data.from,
    });
  });

  socket.on('acceptCall', (data) => {
    console.log('call accepted server');
    io.to(data.to).emit('callAccepted', data.signal);
  });
};

export const startConnection = (io: ioserver.Server) => {
  io.on('connection', (socket: Socket) => {
    if (!users[socket.id]) {
      users[socket.id] = socket.id;
    }
    socket.emit('yourId', socket.id);
    io.emit('allUsers', users);

    // text chat logic
    initTextChat(socket, io);

    //video chat logic
    initVideoChat(socket, io);

    //chess logic
    startChessMultiplayer(socket);

    socket.on('disconnect', () => {
      delete users[socket.id];
      io.emit('message', formatMessage(botName, 'A user disconnected'));
    });
  });
};
