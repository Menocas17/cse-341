import { cartModel } from '../models/cartModel.mjs';
import { userModel } from '../models/userModel.mjs';
import { productById } from './productsController.mjs';

//get cart by user id

export async function getCartByUserId(req, res, next) {
  const { user_id } = req.params;

  try {
    const cart = await cartModel.findOne({
      user_id: user_id,
    });
    if (!cart || cart.length === 0) {
      return res.status(404).json({ message: 'Cart is empty' });
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

////add an item to a cart

export async function addItemCart(req, res, next) {
  const { user_id } = req.params;

  const { quantity, product_id } = req.body;

  const newItem = {
    quantity: quantity,
    product_id: product_id,
  };

  try {
    let cart = await cartModel.findOne({ user_id: user_id });

    if (!cart) {
      cart = new cartModel({
        user_id,
        items: [
          {
            quantity,
            product_id,
          },
        ],
      });

      const savedCart = await cart.save();
      const addCartToUser = await userModel.findByIdAndUpdate(
        user_id,
        {
          cart_id: savedCart._id,
        },
        { new: true }
      );

      if (!addCartToUser) {
        return res.status(400).json({ message: 'User does not exist' });
      }
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product_id.toString() === product_id.toString()
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push(newItem);
      }

      await cart.save();
    }

    console.log(cart);

    res.status(201).json({ message: 'Item added succesfully', cart });
  } catch (err) {
    next(err);
  }
}

/// delete an item from the cart

export async function deleteItemCart(req, res, next) {
  const { user_id, product_id } = req.params;

  try {
    const cart = await cartModel.findOneAndUpdate(
      { user_id: user_id },
      { $inc: { 'items.$[elem].quantity': -1 } },
      { new: true, arrayFilters: [{ 'elem.product_id': product_id }] }
    );

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    if (cart.items.length === 0) {
      return res.status(400).json({ message: 'The cart is already empty' });
    }

    const updatedItem = cart.items.find(
      (item) => item.product_id.toString() === product_id
    );

    if (updatedItem && updatedItem.quantity === 0) {
      const updatedCart = await cartModel.findOneAndUpdate(
        { user_id },
        { $pull: { items: { product_id } } },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: 'Item removed successfully', cart: updatedCart });
    }

    res
      .status(200)
      .json({ message: 'Item quantity updated succesfully', cart });
  } catch (err) {
    next(err);
  }
}
