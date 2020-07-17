import { Request, Response, NextFunction } from 'express';
import { isLoggedIn } from '../../auth';

export const guest = (req: Request, _: Response, next: NextFunction) => {
  if (isLoggedIn(req)) {
    return next(new Error('You are alreadly logged in'));
  }

  next();
};
