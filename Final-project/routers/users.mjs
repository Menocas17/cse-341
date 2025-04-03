import { Router } from 'express';
import {
  editingAccount,
  registerUser,
  deleteAccount,
} from '../controllers/userController.mjs';
const router = Router();

//register a new user route
router.post('/register', registerUser);

//edit user account
router.put('/editAccount/:user_id', editingAccount);

//delete an user account

router.delete('/delete/:user_id', deleteAccount);

//route for process the future login feature
router.post('/login', (req, res) => {
  res.send('Testing routes');
});

export default router;
