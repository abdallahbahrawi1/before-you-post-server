import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../database/models/User';

export const authenticateAndAttachUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.jwt || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    res.locals.user = null;
    return res.status(401).json({ error: 'Authentication token required' });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'JWT secret is not defined' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as unknown as { id: string };
    req.user = decoded;
    const user = await User.findByPk(decoded.id);
    res.locals.user = user;
    if (!user) {
      return res.status(403).json({ error: 'User not found' });
    }
    next();
  } catch (error) {
    console.error(error);
    res.locals.user = null;
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};