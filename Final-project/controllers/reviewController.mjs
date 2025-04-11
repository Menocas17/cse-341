import { reviewModel } from '../models/reviewModel.mjs';

//creating a new review for a product

export async function createReview(req, res, next) {
  const { product_id } = req.params;
  const { user_id, review_rating, review_text } = req.body;

  try {
    const newReview = new reviewModel({
      product_id,
      user_id,
      review_rating,
      review_text,
    });

    await newReview.save();
    res.status(201).json({
      message: `New review created successfully by user_ID:  ${user_id} for product_id: ${product_id}`,
      review_id: newReview._id,
    });
  } catch (err) {
    next(err);
  }
}

//get all the reviews from a product

export async function getAllReviews(req, res, next) {
  const { product_id } = req.params;

  try {
    const allReviews = await reviewModel
      .find({ product_id })
      .populate('user_id', 'user_name user_lastName');

    if (allReviews.length === 0) {
      return res
        .status(404)
        .json({ message: `No reviews found for this product` });
    }

    res.status(200).json({
      message: `All reviews for product_id: ${product_id}`,
      reviews: allReviews,
    });
  } catch (err) {
    next(err);
  }
}

//get all the reviews posted by a user

export async function getUserReviews(req, res, next) {
  const { user_id } = req.params;

  try {
    const allUserReviews = await reviewModel
      .find({ user_id })
      .populate('product_id', 'product_name');

    if (allUserReviews.length === 0) {
      return res
        .status(404)
        .json({ message: 'This user has not posted any reviews' });
    }
    res.status(200).json({
      message: `All reviews posted by user_id: ${user_id}`,
      reviews: allUserReviews,
    });
  } catch (err) {
    next(err);
  }
}

//updating a review

export async function updateReview(req, res, next) {
  const { review_id } = req.params;
  const { review_rating, review_text } = req.body;
  try {
    const updatedReview = await reviewModel.findByIdAndUpdate(
      review_id,
      {
        review_rating,
        review_text,
      },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({
      message: 'Review updated successfully',
      updatedReview,
    });
  } catch (err) {
    next(err);
  }
}

//deleting a review
export async function deleteReview(req, res, next) {
  const { review_id } = req.params;
  try {
    const deletedReview = await reviewModel.findByIdAndDelete(review_id);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: `Review deleted successfully` });
  } catch (err) {
    next(err);
  }
}
