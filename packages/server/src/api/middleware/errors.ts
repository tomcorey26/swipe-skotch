import { RequestHandler, Request, Response, NextFunction } from 'express';

//confusing closure curry shit that checks for errors
// ok.. so this is what i think this does
// takes in the handler function that you would normally just pass to app.post app.get etc
// the ...args destructures the paramaters into an array, (these are the express objects)
//cause this is the handler
// catch async then calls the handler passing in all express objects
// with a .catch so that it handles errors
export const catchAsync = (handler: RequestHandler) => (
  ...args: [Request, Response, NextFunction]
) => handler(...args).catch(args[2]);

//catch(args[2]) === .catch(err => next(err))

export const notFound = (_: Request, res: Response, __: NextFunction) => {
  res.status(404).json({ message: '404 Not Found' });
};

export const serverError = (
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (!err.status) {
    console.error(err.stack);
  }
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error' });
};
