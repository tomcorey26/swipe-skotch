import { Router, Response, Request } from 'express';
import { registerSchema, validate } from '../../validation';
import { User } from '../../entity/User';
import { logIn } from '../../auth';
import { guest, catchAsync } from '../middleware';
import { BadRequest } from '../../errors';

const router = Router();

// the guest is a middle ware we pass in to check if the user
// is logged in already
// under the hood express passes guest its req,res,next e.g
router.post(
  '/register',
  guest,
  catchAsync(async (req: Request, res: Response) => {
    await validate(registerSchema, req.body);

    const { email, password, name } = req.body;

    const found = await User.findOne({ email });

    if (found) {
      throw new BadRequest('Invalid Email');
    }

    const user = await User.create({ email, password, name }).save();

    logIn(req, user.id);

    res.json({ message: 'OK' });
  })
);

export default router;
