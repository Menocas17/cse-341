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
import {
  localLogin,
  userLogout,
  googleCallback,
} from '../controllers/loginController.mjs';
import { loginProtection } from '../middlewares/authentication.mjs';
import { restrictTo } from '../middlewares/authorization.mjs';
import { handleErrors } from '../middlewares/handleErrors.mjs';
import passport from 'passport';

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
router.post('/log-in', localLogin);

//Google Oauth
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

//Goole Oauth callback

router.get(
  '/auth/goole/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/log-in',
  }),
  googleCallback
);

//base home route for testing google Oauth
router.get('/home-panel', (req, res) => {
  res.status(200).json({ message: 'You are logged in with Google' });
});

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
