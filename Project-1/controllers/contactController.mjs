import { getAllContactsFromDB, getContactByNameFromDB } from "../models/contactModel.mjs";

export async function getAllContacts(req, res) {
    try {
        const contacts = await getAllContactsFromDB();
        if (contacts.length === 0) {
           return res.status(404).json({message: 'no data found'})
        }

        res.json(contacts)
    } catch (error){
        res.status(500).json({message: 'Error retrieving data', error: error.message})
    }
}

export async function getContactByName(req, res) {
    const contactName = req.query.name
    try {
        const contactByName = await getContactByNameFromDB(contactName);
        if (contactByName.length === 0) {
           return res.status(404).json({message: 'no data found'})
        }

        res.json(contactByName);
    } catch (error) {
        res.status(500).json({message: 'Error retrieving data', error: error.message})
    }
}