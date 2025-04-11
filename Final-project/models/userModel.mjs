import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  user_name: String,
  user_lastName: String,
  user_birthday: Date,
  user_address: String,
  user_email: { type: String, unique: true },
  hashedPassword: String,
  user_phone_number: String,
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
    required: true,
  },
  cart_id: { type: ObjectId, default: null },
});

export const userModel = mongoose.model('users', userSchema);
