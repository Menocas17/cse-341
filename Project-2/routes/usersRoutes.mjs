import { Router } from 'express';
import {
  getAllUsers,
  createUser,
  updatingUser,
  deletingUser,
} from '../controllers/usersController.mjs';
import {
  newUserRules,
  UpdateUserRules,
  checkRulesResults,
} from '../middlewares/validators.mjs';
import { userLogin, userLogout } from '../controllers/loginController.mjs';
import { loginProtection } from '../middlewares/authentication.mjs';
import { restrictTo } from '../middlewares/authorization.mjs';
import { handleErrors } from '../middlewares/handleErrors.mjs';

const router = Router();

// route for getting all the users, this is going to be used by the admin
router.get(
  '/get-all-users',
  loginProtection,
  restrictTo('admin'),
  handleErrors(getAllUsers)
);

// router for creating a new user
router.post(
  '/create',
  newUserRules(),
  checkRulesResults,
  handleErrors(createUser)
);

// route for login
router.post('/log-in', userLogin);

//route for log out

router.post('/log-out', userLogout);

//route for updating the users details
router.put(
  '/update/:user_id',
  UpdateUserRules(),
  checkRulesResults,
  handleErrors(updatingUser)
);

//route for deleting an user
router.delete('/delete/:user_id', handleErrors(deletingUser));

export default router;
