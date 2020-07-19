import { Request, Response, NextFunction } from 'express';
import { isLoggedIn } from '../../auth';
import { Unauthorized, BadRequest } from '../../errors';

export const guest = (req: Request, _: Response, next: NextFunction) => {
  if (isLoggedIn(req)) {
    return next(new BadRequest('You are alreadly logged in'));
  }

  next();
};

export const auth = (req: Request, _: Response, next: NextFunction) => {
  if (!isLoggedIn(req)) {
    return next(new Unauthorized('You must be logged in'));
  }

  next();
};
