import { Router } from 'express';
import {
  addItemCart,
  deleteItemCart,
  getCartByUserId,
} from '../controllers/cartController.mjs';
const router = Router();

//get cart by user id
router.get('/:user_id', getCartByUserId);

//create a new cart for an user

router.post('/create/:user_id', (req, res) => {
  res.json({ message: 'Route functioning' });
});

//add an item to a cart
router.put('/update/:user_id', addItemCart);

//delete an item from cart
router.delete('/delete/:user_id/:product_id', deleteItemCart);

export default router;
