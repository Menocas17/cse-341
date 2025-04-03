import { Router } from 'express';
import {
  getAllUsers,
  createUser,
  updatingUser,
  deletingUser,
} from '../controllers/usersController.mjs';
import { handleErrors } from '../utilities/handleErrors.mjs';

const router = Router();

// route for getting all the users, this is going to be used by the admin
router.get('/get-all-users', handleErrors(getAllUsers));

// router for creating a new user
router.post('/create', handleErrors(createUser));

// route for login (we are going to add this in the future)
router.post('log-in', (req, res) => {
  res.json({ message: 'This route is working' });
});

//route for updating the users details
router.put('/update/:user_id', handleErrors(updatingUser));

//route for deleting an user
router.delete('/delete/:user_id', handleErrors(deletingUser));

export default router;
