import ioserver, { Socket } from 'socket.io';
export const initVideoChat = (socket: Socket, io: ioserver.Server) => {
  //video chat start
  socket.on('callUser', (data) => {
    //io to lets you only emit something to the user with the passed socket id
    io.to(data.userToCall).emit('hey', {
      signal: data.signalData,
      from: data.from,
    });
  });

  socket.on('acceptCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
};
