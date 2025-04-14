import { Router } from 'express';
import {
  editingAccount,
  registerUser,
  deleteAccount,
  getAllUsers,
} from '../controllers/userController.mjs';
import {
  localLogin,
  googleCallback,
  userLogout,
  homePanel,
} from '../controllers/loginController.mjs';
import { restrictTo } from '../middlewares/authorization.mjs';
import { loginProtection } from '../middlewares/authenticaction.mjs';
import {
  userValidationRules,
  checkRulesResults,
  loginValidationRules,
} from '../middlewares/validations.mjs';
import passport from 'passport';
const router = Router();

//getting all the users in the data base: meant for admins only

router.get('/get-all', loginProtection, restrictTo('admin'), getAllUsers);

//register a new user route
router.post(
  '/register',
  userValidationRules(),
  checkRulesResults,
  registerUser
);

//edit user account
router.put(
  '/editAccount/:user_id',
  userValidationRules(true),
  checkRulesResults,
  loginProtection,
  editingAccount
);

//delete an user account

router.delete(
  '/delete/:user_id',
  userValidationRules(),
  checkRulesResults,
  loginProtection,
  deleteAccount
);

//route for process the local login
router.post('/login', loginValidationRules(), checkRulesResults, localLogin);

//rooute for the log out
router.post('/log-out', userLogout);

//Google Oauth
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

//Google Oauth callback

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  googleCallback
);

//base home route for testing google Oauth
router.get('/home-panel', homePanel);

export default router;
