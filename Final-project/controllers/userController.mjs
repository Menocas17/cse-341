import { userModel } from '../models/userModel.mjs';

//registering new users

export async function registerUser(req, res, next) {
  const {
    user_name,
    user_lastName,
    user_birthday,
    user_address,
    user_email,
    user_password,
    user_phone_number,
  } = req.body;
  try {
    const newUser = new userModel({
      user_name,
      user_lastName,
      user_birthday,
      user_address,
      user_email,
      user_password,
      user_phone_number,
    });

    await newUser.save();
    res.status(201).json({
      message: `New user ${newUser.user_name} ${newUser.user_lastName} created successfully`,
      user_id: newUser._id,
    });
  } catch (err) {
    next(err);
  }
}

//editing account

export async function editingAccount(req, res, next) {
  const { user_id } = req.params;
  const updatedUserInfo = {
    user_name: req.body.user_name,
    user_lastName: req.body.user_lastName,
    user_birthday: req.body.user_birthday,
    user_address: req.body.user_address,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
    user_phone_number: req.body.user_phone_number,
    user_type: req.body.user_type,
    cart_id: req.body.cart_id,
  };

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      user_id,
      updatedUserInfo,
      {
        new: true,
      }
    );

    if (!updatedUser) {
      throw new Error('User does not exist');
    }

    res.status(200).json({
      message: 'User successfully updated',
      updatedUser: updatedUser,
    });
  } catch (err) {
    next(err);
  }
}

//delete and account by id

export async function deleteAccount(req, res, next) {
  const { user_id } = req.params;
  try {
    const deletedContact = await userModel.findByIdAndDelete(user_id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: `User deleted` });
  } catch (err) {
    next(err);
  }
}

//getting all the users in the data base

export async function getAllUsers(req, res, next) {
  try {
    const allUsers = await userModel.find({});

    if (allUsers.length === 0) {
      return res
        .status(404)
        .json({
          message: 'Sorry looks like there is no users in the database',
        });
    }

    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
}
