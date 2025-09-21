import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { generateToken } from '../utils/utils';
import { IUser } from '../types/types';
import { loginSchema, signupSchema } from '../validators/userSchema';


const maxAge = 7 * 24 * 60 * 60 * 1000;

export const signup_post = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const user = await authService.signupUser(fullName, email, password);

    const token = generateToken(user.id);
    res.cookie('jwt', token, { 
      httpOnly: true, 
      maxAge: maxAge, 
      secure: true, 
      sameSite: 'none', 
      domain: '.beforeyoupost.net',
      path: '/',
    });
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
    res.cookie('jwt', token, { 
      httpOnly: true, 
      maxAge: maxAge, 
      secure: true, 
      sameSite: 'none', 
      domain: '.beforeyoupost.net',
      path: '/',
     });
    res.status(200).json({ user: { id: user.id, email: user.email, fullName: user.fullName } });
  } catch (error: Error | any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const googleRedirect = (req: Request, res: Response) => {
  const { user, token } = req.user as { user: IUser; token: string };
  res.cookie('jwt', token, { 
    httpOnly: true, 
    maxAge: maxAge, 
    secure: true, 
    sameSite: 'none', 
    domain: '.beforeyoupost.net',
    path: '/',
  });

  // Redirect to frontend dashboard
  const frontendUrl = process.env.FRONTEND_URL;
  res.redirect(`${frontendUrl}/dashboard`);
};
