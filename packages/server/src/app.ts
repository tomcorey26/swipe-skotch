import express, { Response, Request } from 'express';
import session from 'express-session';
import cors from 'cors';
import ioserver from 'socket.io';
import { startChatConnection } from './startChatConnection';
import { createConnection, Connection } from 'typeorm';
import { User } from './entity/User';
require('dotenv').config();

const TWO_HOURS = 1000 * 60 * 60 * 2;
const {
  PORT = 4000,
  SESS_LIFETIME = TWO_HOURS,
  FRONTEND_URL,
  SESS_NAME,
  SESS_SECRET,
  NODE_ENV,
} = process.env;

//create type orm connection
createConnection().then((connection: Connection) => {
  const userRepository = connection.getRepository(User);

  //set up express app
  const app = express();
  const http = require('http');
  const server = http.Server(app);
  const io = ioserver(server);

  //set up cors
  app.use(
    cors({
      origin:
        NODE_ENV === 'production' ? FRONTEND_URL : 'http://localhost:3000',
      credentials: true,
    })
  );

  // set up session
  // can make it so cookies can not be accesable client side through javascript
  // this is the default behavior for session
  app.use(
    session({
      secret: SESS_SECRET as string,
      name: SESS_NAME,
      resave: false,
      cookie: {
        domain: FRONTEND_URL,
        maxAge: Number(SESS_LIFETIME),
        //toggle wether or not cookie can be sent from the same domain (in this case its not)
        sameSite: false,
        //makes it so you can only send cookie over https
        secure: NODE_ENV === 'production',
      },
    })
  );

  startChatConnection(io);

  app.get('/', (_, res: Response) => {
    res.send({ data: 'ugh' });
  });

  app.get('/login', (_, res: Response) => {
    res.send('durr');
  });

  app.get('/users', async function (_: Request, res: Response) {
    const users = await userRepository.find();
    res.json(users);
  });

  //connect to db here

  server.listen(PORT, () => {
    return console.log(`server is listening on ${PORT}`);
  });
});
