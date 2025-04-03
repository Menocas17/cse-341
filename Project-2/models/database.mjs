import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const uri = process.env.DB_URI;

export async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('Database connected');
  } catch (err) {
    console.error('Conection Error', err);
  }
}
