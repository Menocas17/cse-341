import { Router } from 'express';
import {
  createReview,
  getAllReviews,
  getUserReviews,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.mjs';

const router = Router();

//create a new review for a product
router.post('/create/:product_id', createReview);

//get all reviews for a product
router.get('/:product_id', getAllReviews);

//get all the review posted by a user
router.get('/user-reviews/:user_id', getUserReviews);

//update a review
router.put('/update/:review_id', updateReview);

//delete a review
router.delete('/delete/:review_id', deleteReview);

export default router;
