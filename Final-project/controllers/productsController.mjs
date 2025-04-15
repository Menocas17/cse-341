import { productModel } from '../models/productModel.mjs';

// getting all the products

export async function getAllProducts(req, res, next) {
  try {
    const allProducts = await productModel.find({});

    res.status(200).json(allProducts);
  } catch (err) {
    next(err);
  }
}

//get product by id

export async function productById(req, res, next) {
  const product_id = req.params.product_id;

  try {
    const product = await productModel.findById(product_id).lean();

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
}

//create a new product, once authentication is implemented this is going to be available just to employess and admins

export async function createProduct(req, res, next) {
  const {
    product_brand,
    product_color,
    product_description,
    product_name,
    product_price,
  } = req.body;

  try {
    const newProduct = new productModel({
      product_brand,
      product_color,
      product_description,
      product_name,
      product_price,
    });

    await newProduct.save();

    res.status(201).json({
      message: `New product ${newProduct.product_name} successfully created`,
      product_id: newProduct._id,
    });
  } catch (err) {
    next(err);
  }
}

//updating product by id

export async function updateProduct(req, res, next) {
  const { product_id } = req.params;
  const updatedInfo = {
    product_brand: req.body.product_brand,
    product_color: req.body.product_color,
    product_description: req.body.product_description,
    product_name: req.body.product_name,
    product_price: req.body.product_price,
  };

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      product_id,
      updatedInfo,
      { new: true }
    );
    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product successfully updated',
      updatedUser: updatedProduct,
    });
  } catch (err) {
    next(err);
  }
}

//deleting products

export async function deleteProduct(req, res, next) {
  const { product_id } = req.params;

  try {
    const deletedProduct = await productModel.findByIdAndDelete(product_id);

    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
    }

    res
      .status(200)
      .json({ message: `Product with id: ${product_id} successfully deleted` });
  } catch (err) {
    nect(err);
  }
}
