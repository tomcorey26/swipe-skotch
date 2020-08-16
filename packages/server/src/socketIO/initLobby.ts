import ioserver, { Socket } from 'socket.io';
import { socketEvents, formatMessage } from '@skotch/common';

interface SignalData {
  userToSignal: string;
  signal: any;
  callerID: string;
}
const MAX_LOBBY_CLIENTS = 4;
export const initLobby = (socket: Socket, io: ioserver.Server) => {
  socket.on(socketEvents.JOIN_ROOM, (roomId) => {
    let connectedClients;
    const room = io.sockets.adapter.rooms[roomId];
    if (room) {
      connectedClients = room.length;
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
    }

    const connectedIDs = Object.keys(
      io.sockets.adapter.rooms[roomId].sockets
    ).filter((id) => id !== socket.id);
    socket.emit(socketEvents.ALL_USERS, connectedIDs);
  });

  socket.on(socketEvents.SEND_SIGNAL, (payload: SignalData) => {
    console.log('sent signal');
    io.to(payload.userToSignal).emit(socketEvents.USER_JOINED, {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on(socketEvents.RETURN_SIGNAL, (payload) => {
    io.to(payload.callerID).emit(socketEvents.RECIEVE_RETURN_SIGNAL, {
      signal: payload.signal,
      id: socket.id,
    });
  });
};
