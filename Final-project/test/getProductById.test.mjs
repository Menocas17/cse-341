import mockingoose from 'mockingoose';
import { productModel } from '../models/productModel.mjs';
import { productById } from '../controllers/productsController.mjs';
import { jest } from '@jest/globals';

describe('productById middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockRequest = {
    params: {
      user_id: '67ec2e33af36361fc07eb66e',
    },
  };

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const mockNext = jest.fn();

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

    await productById(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(
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
    const mockRequest = {
      params: {
        user_id: 'nonexisting',
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockNext = jest.fn();

    mockingoose(productModel).toReturn(null, 'findOne');

    await productById(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Product not found',
    });
  });

  it('should call next with error on exception', async () => {
    const mockRequest = {
      params: {
        user_id: '67fd589b6704cf88be809c59',
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockNext = jest.fn();
    const error = new Error('DB Error');
    mockingoose(productModel).toReturn(error, 'findOne');

    await productById(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
