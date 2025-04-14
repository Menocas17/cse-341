import { Router } from 'express';
import {
  createReview,
  getAllReviews,
  getUserReviews,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.mjs';
import {
  reviewsValidationRules,
  checkRulesResults,
} from '../middlewares/validations.mjs';

const router = Router();

//create a new review for a product
router.post(
  '/create/:product_id',
  reviewsValidationRules(),
  checkRulesResults,
  createReview
);

//get all reviews for a product
router.get('/:product_id', getAllReviews);

//get all the review posted by a user
router.get('/user-reviews/:user_id', getUserReviews);

//update a review
router.put(
  '/update/:review_id',
  reviewsValidationRules(),
  checkRulesResults,
  updateReview
);

//delete a review
router.delete('/delete/:review_id', deleteReview);

export default router;
