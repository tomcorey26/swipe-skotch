import express, { Response, Request } from 'express';
import ioserver from 'socket.io';
import { startConnection } from '../socketIO/startConnection';
import cors from 'cors';
import { User } from '../entity/User';
import { IN_PROD } from '../config';
import { register, login } from './routes';
import { notFound, serverError } from './middleware';
// set up session
// can make it so cookies can not be accesable client side through javascript
// this is the default behavior for session

export const createApp = () => {
  const app = express();
  //set up express app
  const http = require('http');
  const server = http.Server(app);
  const io = ioserver(server);

  // this middleware parses json from requests
  app.use(express.json());

  //set up cors
  app.use(
    cors({
      origin: IN_PROD ? process.env.FRONTEND_URL : 'http://localhost:3000',
      credentials: true,
    })
  );

  startConnection(io);

  app.get('/', (_, res: Response) => {
    res.json({ data: 'ugh' });
  });

  app.use(register);

  app.use(login);

  app.get('/users', async function (_: Request, res: Response) {
    const users = await User.find();
    res.json(users);
  });

  //handles 404
  app.use(notFound);

  //this handles all errors in application
  app.use(serverError);

  return server;
};
