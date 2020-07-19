import Joi from '@hapi/joi';
import { BYCRYPT_MAX_BYTES } from '../config/auth';

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .lowercase()
  .trim()
  .required();
const name = Joi.string().min(3).max(128).trim().required();

//bcrypt has a max of 72 bytes
//normally a character is one byte but in some cases they
// are more than on for example emojis, and foreign language chars
// so we check how many bytes instead by passing utf8 to max
//regex from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
//
const password = Joi.string()
  .min(8)
  .max(BYCRYPT_MAX_BYTES, 'utf8')
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .message(
    '"{#label}" must contain  one uppercase letter, one lower case letter, and one digit'
  )
  .required();

const passwordConfirmation = Joi.valid(Joi.ref('password')).required();

export const registerSchema = Joi.object({
  email,
  name,
  password,
  passwordConfirmation,
});

export const loginSchema = Joi.object({
  email,
  password,
});
