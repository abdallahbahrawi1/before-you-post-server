import jwt from 'jsonwebtoken';

export const generateToken = (id: number): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret || !expiresIn) {
    throw new Error('JWT_SECRET or JWT_EXPIRES_IN is not defined in the environment variables.');
  }

  return jwt.sign({ id }, secret, { expiresIn });
};
