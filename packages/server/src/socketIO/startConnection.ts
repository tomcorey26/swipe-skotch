import { Socket } from 'socket.io';
import ioserver from 'socket.io';
import { startChessMultiplayer } from './startChessMultiplayer';
import { initTextChat } from './initTextChat';
import { initVideoChat } from './initVideoChat';
import { initLobby } from './initLobby';
import { socketEvents } from '@skotch/common';

const users: any = {};

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

    //lobby logic
    initLobby(socket, io);

    //chess logic
    startChessMultiplayer(socket);

    socket.on('disconnecting', () => {
      //have to filter bc it includes socket id as rooms
      const roomID = Object.keys(socket.rooms).filter(
        (item) => item != socket.id
      )[0];
      socket.to(roomID).emit(socketEvents.USER_DISCONNECT, socket.id);
    });
    socket.on('disconnect', () => {
      delete users[socket.id];
    });
  });
};
