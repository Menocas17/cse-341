import { userModel } from '../models/usersModels.mjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

function createToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: '2h',
    }
  );
}

//creating the google callback
export function googleCallback(req, res) {
  const token = createToken(req.user);
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7200000,
  });

  res.redirect('/users/home-panel');
}

//creating the log out function
export async function userLogout(req, res, next) {
  try {
    await res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    next(error);
  }
}

//creating the home panel function

export function homePanel(req, res, next) {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const username = decoded.name;
    const userRole = decoded.role;

    if (userRole === 'admin') {
      res.status(200).json({
        message: `Hello ${username}, you are logged is as an admin with Google`,
      });
    } else {
      res
        .status(200)
        .json({ message: `Hello ${username}, you are logged in with Google` });
    }
  } catch (error) {
    next(error);
  }
}
