import { Request, Response } from 'express';
import { SESS_NAME } from './config';

export const logIn = (req: Request, userId: string) => {
  req.session!.userId = userId;
};

//removes session from redis store
// clears client cookie
export const logOut = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    req.session!.destroy((err: Error) => {
      if (err) reject(err);

      res.clearCookie(SESS_NAME as string);
      resolve();
    });
  });

export const isLoggedIn = (req: Request) => !!req.session!.userId;
