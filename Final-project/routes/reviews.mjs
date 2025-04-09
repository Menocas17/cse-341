import { Rrouter } from 'express';

const router = Rrouter();

//create a new review for a product
router.post('/create/:product_id', (req, res) => {
  res.json({ message: 'Route functioning' });
});

//get all reviews for a product
router.get('/:product_id', (req, res) => {
  res.json({ message: 'Route functioning' });
});

//get all the review posted by a user
router.get('/user_reviews/:user_id', (req, res) => {
  res.json({ message: 'Route functioning' });
});

//update a review
router.put('/update/:review_id', (req, res) => {
  res.json({ message: 'Route functioning' });
});

//delete a review
router.delete('/delete/:review_id', (req, res) => {
  res.json({ message: 'Route functioning' });
});

export default router;
