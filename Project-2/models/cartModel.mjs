import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema({
  user_id: { type: ObjectId },
  items: [
    {
      quantity: Number,
      product_id: { type: ObjectId },
      _id: false,
    },
  ],
});

export const cartModel = mongoose.model('cart', cartSchema);
