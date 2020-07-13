import express, { Response, Request } from 'express';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import cors from 'cors';
import ioserver from 'socket.io';
import { startChatConnection } from './startChatConnection';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { REDIS_OPTIONS, SESSION_OPTIONS, APP_PORT, IN_PROD } from './config';
require('dotenv').config();

//create type orm connection
(async () => {
  await createConnection();
  // const userRepository = connection.getRepository(User);

  //set up express app
  const app = express();
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

  const RedisStore = connectRedis(session);
  const client = new Redis(REDIS_OPTIONS);

  // set up session
  // can make it so cookies can not be accesable client side through javascript
  // this is the default behavior for session
  app.use(session({ ...SESSION_OPTIONS, store: new RedisStore({ client }) }));

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

  //connect to db here
  server.listen(APP_PORT, () => {
    return console.log(`server is listening on ${APP_PORT}`);
  });
})();
