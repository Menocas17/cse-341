import mockingoose from 'mockingoose';
import { reviewModel } from '../models/reviewModel.mjs';
import { getUserReviews } from '../controllers/reviewController.mjs';
import { expect, jest } from '@jest/globals';

describe('getAllReviews controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and the user reviews when found', async () => {
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

    const mockReviews = {
      _id: '67fd986764b7f53e56a5ea2d',
      product_id: {
        _id: '67ed92bef2c98ad71847bc7a',
        product_name: 'Air Force One',
      },
      user_id: '67fd589b6704cf88be809c59',
      review_rating: 6,
      review_text:
        'Amazing product, I got it on time and without any problems adding more characters to see if the maximun i shit what would happen hgaskfadshfkasdfadsfafasf asdf adsfdsf dasf fads fadsf asdf adsf asdf adf asd fasfadsf ads fasdfadsf asdf asdf asdfasd fadsfasd fasdf as ghgdeis',
    };

    mockingoose(reviewModel).toReturn(mockReviews, 'find');

    await getUserReviews(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    const responseData = mockResponse.json.mock.calls[0][0];

    const review = responseData.reviews.product_id;
    const message = responseData.message;

    expect(review.toString()).toBe('67ed92bef2c98ad71847bc7a');

    expect(message).toEqual(
      `All reviews posted by user_id: ${mockRequest.params.user_id}`
    );
  });

  it('should return 404 if no reviews are found', async () => {
    const mockRequest = {
      params: {
        product_id: 'nonexistent',
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockNext = jest.fn();

    mockingoose(reviewModel).toReturn([], 'find');

    await getUserReviews(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'This user has not posted any reviews',
    });
  });

  it('should call next with error if there is a problem', async () => {
    const mockError = new Error('Database error');
    const mockRequest = {
      params: {
        product_id: '67ed92bef2c98ad71847bc7a',
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockNext = jest.fn();

    mockingoose(reviewModel).toReturn(mockError, 'find');

    await getUserReviews(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
