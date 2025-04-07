import { userModel } from '../models/usersModels.mjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

function createToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '2h',
  });
}

//creating the login functionalitiy
export async function localLogin(req, res, next) {
  passport.authenticate('local', { session: false }, (error, user, info) => {
    if (error || !user) {
      return res.status(401).json({ message: info?.message || 'Login failed' });
    }
    const token = createToken(user);
    res.cookie('access_tokes', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7200000,
    });

    res.status(200).json({ message: 'Login successful' })(req, res, next);
  });

  // const { email, password } = req.body;

  // try {
  //   const user = await userModel.findOne({ email });

  //   if (!user) {
  //     return res
  //       .status(404)
  //       .json({ message: 'User not found, please verify your email address.' });
  //   }

  //   const authResult = await bcrypt.compare(password, user.hashedPassword);

  //   if (!authResult) {
  //     return res.status(401).json({
  //       message: 'Invalid Password, verify your credentials and try again.',
  //     });
  //   }

  //   const token = createToken(user);
  //   res.cookie('access_tokes', token, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     maxAge: 7200000,
  //   });
  //   res.status(200).json({ message: 'Login successfull' });
  // } catch (error) {
  //   next(error);
  // }
}

//creating the google callback
export function googleCallback(req, res) {
  const token = createToken(req.user);
  res.cookie('access_tokes', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7200000,
  });

  res.redirect('/users/home-panel');
}

export function userLogout(req, res, next) {
  try {
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    next(error);
  }
}
