import express from 'express';
import cors from 'cors';
import ioserver from 'socket.io';
import { startChatConnection } from './startChatConnection';

const app = express();
const http = require('http');
const server = http.Server(app);
const io = ioserver(server);

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : 'http://localhost:3000',
    credentials: true,
  })
);

startChatConnection(io);

app.get('/', (_, res) => {
  res.send({ data: 'ugh' });
});

app.get('/login', (_, res) => {
  res.send('durr');
});

const port = 4000;
server.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
