import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  product_brand: String,
  product_color: String,
  product_description: String,
  product_name: String,
  product_price: Number,
});

export const productModel = mongoose.model('products', productSchema);
