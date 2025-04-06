import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userModel } from '../models/usersModels.mjs';

dotenv.config();

export async function loginProtection(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Not authorize, log in to your account' });
  }

  try {
    const vertifiedJwt = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel
      .findById(vertifiedJwt.id)
      .select('-hashedPassword');
    console.log('User:', req.user);
    next();
  } catch (error) {
    next(error);
  }
}
