import dotenv from 'dotenv';
import mongoose from 'mongoose';
// import { MongoClient } from 'mongodb';

dotenv.config();
const uri = process.env.DB_URI;

// migrating to mongoose as it's simplier to manage the connection to the DB

export async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('Database Connected');
  } catch (err) {
    console.error('Connection Error', err);
  }
}

// const client = new MongoClient(uri);

// let db;

// export async function connectDB() {
//   try {
//     await client.connect();
//     db = client.db('Learning_Activities_CSE341');
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB', error);
//   }
// }

// export function getDB() {
//   if (!db) {
//     throw new Error('Database not connected');
//   }
//   return db;
// }
