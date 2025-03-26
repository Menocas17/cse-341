import {
  getAllContactsFromDB,
  getContactByNameFromDB,
  contactModel,
} from '../models/contactModel.mjs';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export async function getAllContacts(req, res) {
  try {
    const contacts = await getAllContactsFromDB();

    if (contacts.length === 0) {
      return res.status(404).json({ message: 'no data found' });
    }

    res.json(contacts);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving data', error: error.message });
  }
}

export async function getContactByName(req, res, next) {
  const contactName = req.query.name;
  try {
    const contactByName = await getContactByNameFromDB(contactName);
    if (contactByName.length === 0) {
      throw createHttpError(400, 'No contact with that name in the database');
    }

    res.json(contactByName);
  } catch (error) {
    next(error);
  }
}

export async function addNewContact(req, res) {
  const { firstName, lastname, email, birthday, favoriteColor } = req.body;
  try {
    const newContact = new contactModel({
      firstName,
      lastname,
      email,
      birthday,
      favoriteColor,
    });
    await newContact.save();

    res.status(201).json({
      message: `New Contact ${newContact.firstName} created successfully`,
      ObjectId: newContact._id,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
}

export async function updateContact(req, res, next) {
  const { id } = req.params;
  const updatedContactInfo = {
    firstName: req.body.firstName,
    lastname: req.body.lastname,
    email: req.body.email,
    birthday: req.body.birthday,
    favoriteColor: req.body.favoriteColor,
  };
  try {
    const updatedContact = await contactModel.findByIdAndUpdate(
      id,
      updatedContactInfo,
      { new: true },
    );
    if (!updatedContact) {
      throw createHttpError(404, 'Contact does not exist');
    }

    res.json({
      message: 'Contact updated successfully',
      updatedContact: updatedContact,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteContact(req, res) {
  const { id } = req.params;
  try {
    const deletedContact = await contactModel.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error in deleting the contact', error });
  }
}
