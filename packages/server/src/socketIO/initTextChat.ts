import ioserver, { Socket } from 'socket.io';
import { formatMessage } from '@skotch/common';

export const initTextChat = (socket: Socket, io: ioserver.Server) => {
  // messages
  //socket.broadcast: emits to all clients except for the client connecting
  // {input, roomId}
  socket.on('message', (data) => {
    //socket: emits to the single client that is connecting
    //io: broadcasts to everybody
    io.in(data.roomId).emit('message', formatMessage(data.name, data.input));
  });
};
