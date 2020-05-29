import express from 'express';
import cors from 'cors';
import ioserver from 'socket.io';

const app = express();
const server = require('http').Server(app);
const io = ioserver(server);

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

let interval: any;

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      message: data,
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
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
