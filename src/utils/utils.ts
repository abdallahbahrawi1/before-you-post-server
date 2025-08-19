import jwt from 'jsonwebtoken';

export const generateToken = (id: number): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }

  return jwt.sign({ id }, secret, { expiresIn: '7d' });
};
