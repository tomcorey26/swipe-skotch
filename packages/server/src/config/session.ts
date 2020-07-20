import { SessionOptions } from 'express-session';
import { NODE_ENV } from './app';
require('dotenv').config();

const TWO_HOURS = 1000 * 60 * 60 * 2;
export const {
  SESS_LIFETIME = TWO_HOURS,
  FRONTEND_URL,
  SESS_NAME,
  SESS_SECRET,
} = process.env;

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESS_SECRET as string,
  name: SESS_NAME,
  cookie: {
    domain: NODE_ENV === 'production' ? FRONTEND_URL : 'http://localhost:3000',
    maxAge: Number(SESS_LIFETIME),
    //toggle wether or not cookie can be sent from the same domain (in this case its not)
    sameSite: false,
    //makes it so you can only send cookie over https
    secure: NODE_ENV === 'production',
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
};
