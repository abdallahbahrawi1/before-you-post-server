import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../database/models/User';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    res.status(401).json({ error: 'Authentication token required' });
  }
  
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'JWT secret is not defined' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.jwt;
  if (!token) {
    res.locals.user = null;
    res.status(401).json({ error: 'Authentication token required' });
  }

  if (!process.env.JWT_SECRET) {
    res.status(500).json({ error: 'JWT secret is not defined' });
  }
  
  try {    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as unknown as { id: string };

    const user = await User.findByPk(decoded.id);
    res.locals.user = user;
  } catch (error) {
    console.error(error);
    res.locals.user = null;
  }
  next();
};