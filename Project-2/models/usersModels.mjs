import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  birthday: Date,
  email: { type: String, unique: true },
  phoneNumber: String,
  hashedPassword: String,
  googleId: String,
  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    require: true,
  },
});

export const userModel = mongoose.model('users', userSchema);
