import express from 'express';
import {
  getAllContacts,
  getContactByName,
  addNewContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController.mjs';
import { newContactRules, checkNewContact } from '../utilities/validators.mjs';
import { handleErrors } from '../utilities/index.mjs';
const router = express.Router();

// home router

router.get('/', (req, res) => {
  res.send('Hellou CSE 341');
});
// route for getting all the contacts list
router.get('/get-all', getAllContacts);

// router for getting an specific contact based on a query parameter
router.get('/get-by-name', getContactByName);

//router for adding a new contact in the databse

router.post(
  '/add-new',
  newContactRules(),
  checkNewContact,
  handleErrors(addNewContact),
);

//router for updating an specific contact

router.put('/update/:id', handleErrors(updateContact));

//router for deleting an specific contact

router.delete('/delete/:id', deleteContact);

export default router;
