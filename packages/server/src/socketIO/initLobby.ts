import ioserver, { Socket } from 'socket.io';
import {
  socketEvents,
  formatMessage,
  GameType,
  ChessPlayer,
} from '@skotch/common';

interface SignalData {
  userToSignal: string;
  signal: any;
  callerID: string;
  name: string;
}
const MAX_LOBBY_CLIENTS = 2;
export const initLobby = (socket: Socket, io: ioserver.Server) => {
  socket.on(socketEvents.JOIN_ROOM, (roomId) => {
    let connectedClients = 1;
    const room = io.sockets.adapter.rooms[roomId];
    if (room) {
      connectedClients = room.length;
    }

    if (connectedClients > MAX_LOBBY_CLIENTS) {
      socket.emit(socketEvents.LOBBY_FULL);
    } else {
      socket.join(roomId);
      socket
        .to(roomId)
        .broadcast.emit(
          'message',
          formatMessage('Bot', 'a user has joined the lobby')
        );

      const connectedIDs = Object.keys(
        io.sockets.adapter.rooms[roomId].sockets
      ).filter((id) => id !== socket.id);
      socket.emit(socketEvents.ALL_USERS, connectedIDs);
    }
  });

  socket.on(socketEvents.SEND_SIGNAL, (payload: SignalData) => {
    io.to(payload.userToSignal).emit(socketEvents.USER_JOINED, {
      signal: payload.signal,
      callerID: payload.callerID,
      name: payload.name,
    });
  });

  socket.on(socketEvents.RETURN_SIGNAL, (payload) => {
    io.to(payload.callerID).emit(socketEvents.RECIEVE_RETURN_SIGNAL, {
      signal: payload.signal,
      id: socket.id,
      name: payload.name,
    });
  });
  socket.on(socketEvents.NAME_CHANGE, (roomId, name, userId) => {
    socket.to(roomId).emit(socketEvents.NAME_CHANGE, name, userId);
  });

  socket.on(socketEvents.START_GAME, (gameType: GameType, roomId: string) => {
    switch (gameType) {
      case GameType.CHESS:
        const connectedIDs = Object.keys(
          io.sockets.adapter.rooms[roomId].sockets
        );
        const player1: ChessPlayer = {
          id: connectedIDs[0],
          color: 'w',
        };
        const player2: ChessPlayer = {
          id: connectedIDs[1],
          color: 'b',
        };

        io.in(roomId).emit(socketEvents.BEGIN_CHESS, {
          players: [player1, player2],
        });
        break;
      default:
        console.log('game type not found');
        return;
    }
  });
};
