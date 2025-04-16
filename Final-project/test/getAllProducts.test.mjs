import mockingoose from 'mockingoose';
import { productModel } from '../models/productModel.mjs';
import { jest } from '@jest/globals';
import { getAllProducts } from '../controllers/productsController.mjs';

describe('Unit tests for productController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and an array of all products', async () => {
    const mockRequest = {
      params: {},
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockNext = jest.fn();

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

    await getAllProducts(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith(
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
    const mockRequest = {
      params: {},
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockNext = jest.fn();
    const error = new Error('Database error');
    mockingoose(productModel).toReturn(error, 'find');

    await getAllProducts(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
