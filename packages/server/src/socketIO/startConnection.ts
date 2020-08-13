import { Socket } from 'socket.io';
import ioserver from 'socket.io';
import { startChessMultiplayer } from './startChessMultiplayer';
import { initTextChat } from './initTextChat';
import { initVideoChat } from './initVideoChat';
import { initLobby } from './initLobby';

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

    socket.on('disconnect', () => {
      delete users[socket.id];
    });
  });
};
