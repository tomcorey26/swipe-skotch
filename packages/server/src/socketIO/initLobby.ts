import ioserver, { Socket } from 'socket.io';
import { socketEvents, formatMessage } from '@skotch/common';

const MAX_LOBBY_CLIENTS = 2;
export const initLobby = (socket: Socket, io: ioserver.Server) => {
  socket.on(socketEvents.JOIN_ROOM, (roomId) => {
    let connectedClients;
    if (io.sockets.adapter.rooms[roomId]) {
      connectedClients = io.sockets.adapter.rooms[roomId].length;
    }

    if (connectedClients === MAX_LOBBY_CLIENTS) {
      socket.emit(socketEvents.LOBBY_FULL);
    } else {
      socket.join(roomId);
      socket
        .to(roomId)
        .broadcast.emit(
          'message',
          formatMessage('Bot', 'a user has joined the lobby')
        );

      socket.to(roomId).broadcast.emit(socketEvents.USER_CONNECTED, socket.id);
    }
  });
};
