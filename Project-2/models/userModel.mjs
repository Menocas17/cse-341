import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  user_name: String,
  user_lastName: String,
  user_birthday: Date,
  user_address: String,
  user_email: { type: String, unique: true },
  user_password: String,
  user_phone_number: String,
  user_type: { type: String, default: 'user' },
  cart_id: { type: ObjectId, default: null },
});

export const userModel = mongoose.model('users', userSchema);
