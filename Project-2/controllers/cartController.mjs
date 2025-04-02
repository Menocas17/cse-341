import { cartModel } from '../models/cartModel.mjs';
import { productById } from './productsController.mjs';

//get cart by user id

export async function getCartByUserId(req, res, next) {
  const { user_id } = req.params;

  try {
    const cart = await cartModel.findOne({
      user_id: user_id,
    });
    if (!cart) {
      return res.status(404).json({ message: 'The is no cart for this user' });
    }

    const items = await Promise.all(
      cart.items.map(async (product) => {
        const productDetails = await productById(
          null,
          null,
          null,
          product.product_id
        );

        return {
          quantity: product.quantity,
          product_id: product.product_id,
          product_name: productDetails.product_name,
          product_price: productDetails.product_price,
        };
      })
    );

    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
}
