import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastname: String,
  email: { type: String, unique: true },
  birthday: Date,
  favoriteColor: String,
});

const contactModel = mongoose.model('Contacts', contactSchema, 'Contacts');

export async function getAllContactsFromDB() {
  const allConctacts = await contactModel.find({});
  return allConctacts;
}

export async function getContactByNameFromDB(name) {
  const regex = new RegExp(name, 'i');
  const contactByName = await contactModel.find({
    firstName: { $regex: regex },
  });
  return contactByName;
}

// import { connectDB, getDB } from "./database.mjs";

// let initCollection;

// async function initConnection () {
//     if(!initCollection) {
//         await connectDB();
//         const db = getDB();
//         initCollection = db.collection('Contacts');
//     }

//     return initCollection;
// }

// export async function getAllContactsFromDB () {

//     const collection = await initConnection()
//     const AllContacts = await collection.find({}).toArray();
//     return AllContacts;
// }

// export async function getContactByNameFromDB (name) {
//     const collection = await initConnection();
//     const regex = new RegExp(name, 'i');
//     const ContactByName = await collection.find({"firstName": { $regex: regex}}).toArray();
//     return ContactByName;
// }

// getAllContactsFromDB();
