import { Socket } from 'socket.io';
import { socketEvents } from '@skotch/common';

export const startChessMultiplayer = (socket: Socket) => {
  socket.on(socketEvents.MY_MOVE, (data) => {
    socket.broadcast.emit(socketEvents.ENEMY_MOVE, data);
  });
};
