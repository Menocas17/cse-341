import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  review_rating: { type: Number, min: 1, max: 10 },
  review_text: String,
});

export const reviewModel = mongoose.model('reviews', reviewSchema);
