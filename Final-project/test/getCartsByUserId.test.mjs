import mockingoose from 'mockingoose';
import { cartModel } from '../models/cartModel.mjs';
import { expect, jest } from '@jest/globals';

await jest.unstable_mockModule('../utilities/getProductById.mjs', () => ({
  getProductDetailsById: jest.fn(),
}));

const { getProductDetailsById } = await import(
  '../utilities/getProductById.mjs'
);
const { getCartByUserId } = await import('../controllers/cartController.mjs');

describe('getCartById controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and the cart with the products', async () => {
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

    const mockCart = {
      _id: '67ec3d9929bff1ada3a79ef0',
      user_id: '67fd589b6704cf88be809c59',
      items: [
        {
          quantity: 9,
          product_id: '67ec2e33af36361fc07eb66e',
        },
        {
          quantity: 1,
          product_id: '67ed92bef2c98ad71847bc7a',
        },
      ],
    };

    const mockProductDetails = {
      product_name: 'Product Name',
      product_price: 99.99,
    };

    mockingoose(cartModel).toReturn(mockCart, 'findOne');

    getProductDetailsById.mockImplementation(async (id) => ({
      ...mockProductDetails,
      product_id: id,
    }));
    await getCartByUserId(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    const returnedData = mockResponse.json.mock.calls[0][0];
    console.log(returnedData);
    expect(returnedData).toHaveLength(2);
    expect(returnedData[0].quantity).toBe(9);
    expect(returnedData[0].product_id.toString()).toBe(
      '67ec2e33af36361fc07eb66e'
    );
  });

  it('should return 404 if cart is empty ot not found', async () => {
    const mockRequest = {
      params: {
        user_id: 'noexist',
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockNext = jest.fn();

    mockingoose(cartModel).toReturn(null, 'findOne');

    await getCartByUserId(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Cart is empty',
    });
  });

  it('should call next with error if something goes wrong', async () => {
    const mockRequest = {
      params: {
        user_id: 'noimportant',
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockNext = jest.fn();

    const error = new Error('DB error');
    mockingoose(cartModel).toReturn(error, 'findOne');

    await getCartByUserId(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
