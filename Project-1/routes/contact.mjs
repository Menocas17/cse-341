import express from 'express';
import {getAllContacts, getContactByName} from '../controllers/contactController.mjs'
const router = express.Router();

// home router

router.get('/', (req, res) => {
    res.send('Hellou CSE 341')
})
// route for getting all the contacts list
router.get('/get-all', getAllContacts);

// router for getting an specific contact based on a query parameter
router.get('/get-by-name', getContactByName);

export default router;
