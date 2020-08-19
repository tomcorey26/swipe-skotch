// import Redis from 'ioredis';
// import connectRedis from 'connect-redis';
// import session from 'express-session';
// import { createConnection } from 'typeorm';
import { APP_PORT } from './config';
import { createApp } from './api/app';
require('dotenv').config();

//need redis and postgresdocker connected
//create type orm connection
(async () => {
  // try {
  //   await createConnection();
  // } catch (err) {
  //   console.log(err);
  // }

  // const RedisStore = connectRedis(session);

  // const client = new Redis(REDIS_OPTIONS);

  // const store = new RedisStore({ client });

  // const server = createApp(store);
  const server = createApp();

  server.listen(APP_PORT, () => {
    return console.log(`server is listening on ${APP_PORT}`);
  });
})();
