import mockingoose from 'mockingoose';
import { userModel } from '../models/userModel.mjs';
import { getAllUsers } from '../controllers/userController.mjs';
import { jest } from '@jest/globals';

describe('unit test for the getAllUser controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should return a json with all users and status 200', async () => {
    const mockUsers = [
      {
        user_name: 'Rodolfo',
        user_lastName: 'Menocal',
        user_birthday: new Date('2000-01-01'),
        user_address: 'De la plaza Julio Martinez 6c al lago, 1c arriba',
        user_email: 'rodolfomenocal1755@gmail.com',
        hashedPassword: 'TestingHasshedPassword17!',
        user_phone_number: '+505 769181745',
        role: 'user',
        cart_id: null,
      },
    ];

    mockingoose(userModel).toReturn(mockUsers, 'find');

    await getAllUsers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          user_name: 'Rodolfo',
          user_email: 'rodolfomenocal1755@gmail.com',
          user_birthday: new Date('2000-01-01'),
          user_address: 'De la plaza Julio Martinez 6c al lago, 1c arriba',
          user_email: 'rodolfomenocal1755@gmail.com',
          hashedPassword: 'TestingHasshedPassword17!',
          user_phone_number: '+505 769181745',
          role: 'user',
          cart_id: null,
        }),
      ])
    );
  });

  it('should return 404 if no users are found', async () => {
    mockingoose(userModel).toReturn([], 'find');

    await getAllUsers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Sorry looks like there is no users in the database',
    });
  });

  it('should call next(err) on error', async () => {
    const error = new Error('Database error');
    mockingoose(userModel).toReturn(error, 'find');

    await getAllUsers(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
