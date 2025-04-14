import { Router } from 'express';
import {
  addItemCart,
  deleteItemCart,
  getCartByUserId,
} from '../controllers/cartController.mjs';
import { loginProtection } from '../middlewares/authenticaction.mjs';
const router = Router();

//get cart by user id
router.get('/:user_id', loginProtection, getCartByUserId);

//add an item to a cart
router.put('/update/:user_id', loginProtection, addItemCart);

//delete an item from cart
router.delete('/delete/:user_id/:product_id', loginProtection, deleteItemCart);

export default router;
