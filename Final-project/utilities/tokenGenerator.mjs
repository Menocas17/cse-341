import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export function createToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.user_name },
    process.env.JWT_SECRET,
    {
      expiresIn: '2h',
    }
  );
}
