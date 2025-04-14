import mockingoose from 'mockingoose';
import { productModel } from '../models/productModel.mjs'; // Adjust the path if needed
import { jest } from '@jest/globals';
import {
  getAllProducts,
  productById,
} from '../controllers/productsController.mjs';

describe('Unit tests for productController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: { product_id: '67ec2e33af36361fc07eb66e' },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it('should return 200 and an array of all products', async () => {
    const mockProducts = [
      {
        _id: '67ec2e33af36361fc07eb66e',
        product_brand: 'TestingBrand',
        product_color: 'Red',
        product_description:
          'This is a test description for a product in a only store',
        product_name: 'TestingProduct',
        product_price: 24.44,
      },
    ];

    mockingoose(productModel).toReturn(mockProducts, 'find');

    await getAllProducts(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          product_brand: 'TestingBrand',
          product_color: 'Red',
          product_description:
            'This is a test description for a product in a only store',
          product_name: 'TestingProduct',
          product_price: 24.44,
        }),
      ])
    );
  });

  it('should handle error and call next(err)', async () => {
    const error = new Error('Database error');
    mockingoose(productModel).toReturn(error, 'find');

    await getAllProducts(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
