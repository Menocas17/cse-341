import mockingoose from 'mockingoose';
import { reviewModel } from '../models/reviewModel.mjs';
import { getAllReviews } from '../controllers/reviewController.mjs';
import { expect, jest } from '@jest/globals';

describe('getAllReviews controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 with reviews when found', async () => {
    const mockReq = {
      params: {
        product_id: '67ed92bef2c98ad71847bc7a',
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockNext = jest.fn();

    const mockReviews = {
      _id: '67fd986764b7f53e56a5ea2d',
      product_id: '67ed92bef2c98ad71847bc7a',
      user_id: {
        _id: '67fd589b6704cf88be809c59',
        user_name: 'Rodolfo',
        user_lastName: 'Menocal',
      },
      review_rating: 6,
      review_text:
        'Amazing product, I got it on time and without any problems adding more characters to see if the maximun i shit what would happen hgaskfadshfkasdfadsfafasf asdf adsfdsf dasf fads fadsf asdf adsf asdf adf asd fasfadsf ads fasdfadsf asdf asdf asdfasd fadsfasd fasdf as ghgdeis',
    };

    mockingoose(reviewModel).toReturn(mockReviews, 'find');

    await getAllReviews(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    const responseData = mockRes.json.mock.calls[0][0];

    const review_id = responseData.reviews._id;
    const user_id = responseData.reviews.user_id._id;
    const message = responseData.message;
    expect(review_id.toString()).toBe('67fd986764b7f53e56a5ea2d');
    expect(user_id.toString()).toBe('67fd589b6704cf88be809c59');
    expect(message).toBe(
      `All reviews for product_id: ${mockReq.params.product_id}`
    );
  });

  it('should return 404 if no reviews are found', async () => {
    const mockReq = {
      params: {
        product_id: 'nonexistent',
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockNext = jest.fn();

    mockingoose(reviewModel).toReturn([], 'find');

    await getAllReviews(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'No reviews found for this product',
    });
  });

  it('should call next with error on exception', async () => {
    const error = new Error('DB error');

    const mockReq = {
      params: {
        product_id: '67ed92bef2c98ad71847bc7a',
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockNext = jest.fn();

    mockingoose(reviewModel).toReturn(error, 'find');

    await getAllReviews(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
