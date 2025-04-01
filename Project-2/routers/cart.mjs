import { Router } from 'express';
const router = Router();

//get cart by user id
router.get('/:user_id', (req, res) => {
  res.send('Testing routes');
});

//add an item to a cart
router.put('/update/:user_id', (req, res) => {
  res.send('Testing routes');
});

//delete an item from cart
router.delete('/delete/:user_id/:product_id', (req, res) => {
  res.send('Testing routes');
});

export default router;
