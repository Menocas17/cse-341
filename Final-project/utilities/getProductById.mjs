import { productModel } from '../models/productModel.mjs';

export async function getProductDetailsById(productId) {
  const product = await productModel.findById(productId).lean();
  if (!product) throw new Error('Product not found');
  return product;
}
