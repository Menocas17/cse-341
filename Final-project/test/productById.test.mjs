import mockingoose from 'mockingoose';
import { productModel } from '../models/productModel'; // adjust path to your model
import { productById } from '../controllers/productsController.mjs'; // adjust path to your function
import { jest } from '@jest/globals';

describe('productById middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: { product_id: '507f191e810c19729de860ea' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    mockingoose.resetAll();
  });

  it('should return product when found and no param passed', async () => {
    const mockProduct = {
      _id: '67ec2e33af36361fc07eb66e',
      product_brand: 'TestingBrand',
      product_color: 'Red',
      product_description:
        'This is a test description for a product in a only store',
      product_name: 'TestingProduct',
      product_price: 24.44,
    };
    mockingoose(productModel).toReturn(mockProduct, 'findOne');

    await productById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        product_brand: 'TestingBrand',
        product_color: 'Red',
        product_description:
          'This is a test description for a product in a only store',
        product_name: 'TestingProduct',
        product_price: 24.44,
      })
    );
  });

  it('should return 404 when product not found', async () => {
    mockingoose(productModel).toReturn(null, 'findOne');

    await productById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
  });

  it('should call next with error on exception', async () => {
    const error = new Error('DB Error');
    mockingoose(productModel).toReturn(error, 'findOne');

    await productById(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
