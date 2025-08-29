import bcrypt from 'bcrypt';
import User from '../database/models/User';
import { IUser } from '../types/types';

export const signupUser = async (
  fullName: string,
  email: string,
  password: string
): Promise<IUser> => {
  // Check if user already exists
  const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
  if (existingUser) {
    throw new Error('Email is already in use.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  return user as unknown as IUser;
};

export const loginUser = async (email: string, password: string): Promise<IUser> => {
  // Find user by email
  const user = await User.findOne({ 
    where: { email: email.toLowerCase() } 
  }) as unknown as IUser;

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  return user;
};

