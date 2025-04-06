import bcrypt from 'bcrypt';
import mongoose, { mongo } from 'mongoose';
import { userModel } from '../models/usersModels.mjs';

//getting all the users in the database

export async function getAllUsers(req, res, next) {
  try {
    const allUsers = await userModel.find({});
    if (!allUsers) {
      return res
        .status(404)
        .json({ message: 'Not users found in the database' });
    }
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
}

// creating a new user in the database

export async function createUser(req, res, next) {
  const { name, lastName, birthday, email, phoneNumber, password, role } =
    req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new userModel({
      name,
      lastName,
      birthday,
      email,
      phoneNumber,
      hashedPassword,
      role,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: `New user ${name} ${lastName} created!!`, newUser });
  } catch (error) {
    next(error);
  }
}

//updating the users details

export async function updatingUser(req, res, next) {
  const user_id = req.params.user_id;

  const userIdObject = mongoose.Types.ObjectId.createFromHexString(user_id);

  let hashedPassword;

  if (req.body.password) {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);
  }

  const updatedInfo = {
    name: req.body.name,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    hashedPassword: hashedPassword,
  };

  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userIdObject },
      updatedInfo,
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'user successfully updated',
      updated_user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
}

//deleting user

export async function deletingUser(req, res, next) {
  const user_id = req.params.user_id;
  const userIdObject = mongoose.Types.ObjectId.createFromHexString(user_id);
  try {
    const deletedUser = await userModel.findOneAndDelete({ _id: userIdObject });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found in the databse' });
    }

    res.status(200).json({
      message: 'User successfully deleted',
      deleted_user: deletedUser,
    });
  } catch (error) {
    next(error);
  }
}
