import { Router } from 'express';
const router = Router();

//getting all products route
router.get('/', (req, res) => {
  res.send('Testing routes');
});

//getting product by id
router.get('/:product_id', (req, res) => {
  res.send('Testing routes');
});

//Creating a new product
router.post('/create', (req, res) => {
  res.send('Testing routes');
});

//updating product by id
router.put('/update/:product_id', (req, res) => {
  res.send('Testing routes');
});

//deleting product by id

router.delete('/delete/:product_id', (req, res) => {
  res.send('Testing routes');
});

export default router;
