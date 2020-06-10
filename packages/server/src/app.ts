import express from 'express';
import cors from 'cors';
import ioserver, { Socket } from 'socket.io';

const app = express();
const http = require('http');
const server = http.Server(app);
const io = ioserver(server);

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

io.on('connection', (socket: Socket) => {
  socket.emit('message', { message: 'welcome to tomcord' });

  //socket.broadcast: emits to all clients except for the client connecting
  socket.broadcast.emit('message', { message: 'a user has joined the chat' });

  socket.on('message', (data) => {
    //socket: emits to the single client that is connecting

    //io: broadcasts to everybody
    io.emit('message', {
      message: data,
    });
  });

  socket.on('disconnect', () => {
    io.emit('message', { message: 'user disconnected' });
  });
});

// const getApiAndEmit = (socket: Socket) => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit('FromAPI', response);
// };

app.get('/', (_, res) => {
  res.send({ data: 'The sedulous hyena ate the antelope!' });
});

//test
app.get('/hurr', (_, res) => {
  res.send('durr');
});

const port = 4000;
server.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
