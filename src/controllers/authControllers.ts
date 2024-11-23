import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { generateToken } from '../utils/utils';
import { IUser } from '../types/types';
import Joi from 'joi';
import { loginSchema, signupSchema } from '../validators/userSchema';


const maxAge = 3 * 24 * 60 * 60;

export const signup_get = (req: Request, res: Response) => {
  res.send('signup get');
};

export const login_get = (req: Request, res: Response) => {
  res.send('login get');
};

export const signup_post = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const user = await authService.signupUser(firstName, lastName, email, password);

    const token = generateToken(user.id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user.id });
  } catch (error: Error | any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const login_post = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const user = await authService.loginUser(email, password);

    const token = generateToken(user.id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user.id });
  } catch (error: Error | any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const googleRedirect = (req: Request, res: Response) => {
  const { user, token } = req.user as { user: IUser; token: string };
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.status(200).json({ user: user.id });
};
