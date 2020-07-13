import express, { Response, Request } from 'express';
import ioserver from 'socket.io';
import { startChatConnection } from '../startChatConnection';
import session, { Store } from 'express-session';
import cors from 'cors';
import { User } from '../entity/User';
import { IN_PROD, SESSION_OPTIONS } from '../config';
// set up session
// can make it so cookies can not be accesable client side through javascript
// this is the default behavior for session

export const createApp = (store: Store) => {
  const app = express();
  //set up express app
  const http = require('http');
  const server = http.Server(app);
  const io = ioserver(server);

  //set up cors
  app.use(
    cors({
      origin: IN_PROD ? process.env.FRONTEND_URL : 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use(session({ ...SESSION_OPTIONS, store: store }));

  startChatConnection(io);

  app.get('/', (_, res: Response) => {
    res.send({ data: 'ugh' });
  });

  app.get('/login', (_, res: Response) => {
    res.send('durr');
  });

  app.get('/users', async function (_: Request, res: Response) {
    const users = await User.find();
    res.json(users);
  });

  return server;
};
