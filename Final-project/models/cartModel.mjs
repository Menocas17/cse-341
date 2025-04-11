import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema({
  user_id: { type: ObjectId, ref: 'users' },
  items: [
    {
      quantity: Number,
      product_id: { type: ObjectId, ref: 'products' },
      _id: false,
    },
  ],
});

export const cartModel = mongoose.model('cart', cartSchema);
