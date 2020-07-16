import { Router, Response, Request } from 'express';
import { registerSchema } from '../../validation/auth';
import { User } from '../../entity/User';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    await registerSchema.validateAsync(req.body, { abortEarly: false });
  } catch (err) {
    res.send({ error: err });
  }
  const { email, password, name } = req.body;

  const found = await User.findOne({ email });

  if (found) {
    throw new Error('Invalid Email');
  }

  try {
    await User.create({ email, password, name }).save();
  } catch (err) {
    res.send({ error: err });
  }
  res.send({ message: 'OK' });
});

export default router;
