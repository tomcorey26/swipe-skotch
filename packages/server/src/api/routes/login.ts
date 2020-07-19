import { Router } from 'express';
import { catchAsync, guest, auth } from '../middleware';
import { loginSchema, validate } from '../../validation';
import { User } from '../../entity/User';
import { compare } from 'bcryptjs';
import { Unauthorized } from '../../errors';
import { logIn, logOut } from '../../auth';

const router = Router();

router.post(
  '/login',
  guest,
  catchAsync(async (req, res) => {
    await validate(loginSchema, req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    let passMatch;
    if (user) {
      passMatch = await compare(password, user.password);
    }

    if (!user || !passMatch) {
      throw new Unauthorized('Incorrect email or password');
    }

    logIn(req, user.id);

    res.json({ message: 'OK' });
  })
);

router.post(
  '/logout',
  auth,
  catchAsync(async (req, res) => {
    await logOut(req, res);
    res.json({ message: 'OK' });
  })
);

export default router;
