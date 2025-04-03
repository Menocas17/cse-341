import mongoose, { mongo } from 'mongoose';
import { mealModel } from '../models/mealsModel.mjs';

//getting all the meal plans for a user
export async function getAllMealPlans(req, res, next) {
  const user_id = req.params.user_id;
  try {
    const mealPlans = await mealModel.find({ user_id });

    if (!mealPlans) {
      return res
        .status(404)
        .json({ message: 'there are no meal plans for this user' });
    }

    res.json(mealPlans);
  } catch (error) {
    next(error);
  }
}

//getting an specific meal plan

export async function getMealPlan(req, res, next) {
  const meal_plan_id = req.params.meal_plan_id;
  const mealPlanObjID =
    mongoose.Types.ObjectId.createFromHexString(meal_plan_id);

  try {
    const mealPlan = await mealModel.findOne({ _id: mealPlanObjID });
    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    res.status(200).json(mealPlan);
  } catch (error) {
    next(error);
  }
}

//creating a new meal plan

export async function createMealPlan(req, res, next) {
  const user_id = req.params.user_id;

  let meals;

  meals = req.body.meals;

  try {
    const newMealPlan = new mealModel({
      user_id,
      meals,
      mealPlan_name: req.body.mealPlan_name,
    });

    await newMealPlan.save();

    res.status(201).json({
      message: 'New meal plan created',
      newMealPlan,
    });
  } catch (error) {
    next(error);
  }
}

//route for updating a meal plan

export async function updatingMealPlan(req, res, next) {
  const meal_plan_id = req.params.meal_plan_id;
  const mealPlanObjID =
    mongoose.Types.ObjectId.createFromHexString(meal_plan_id);

  let meals;

  meals = req.body.meals;

  const Updatedinfo = {
    meals,
    mealPlan_name: req.body.mealPlan_name,
  };

  try {
    const updatedMealPlan = await mealModel.findOneAndUpdate(
      { _id: mealPlanObjID },
      Updatedinfo,
      { new: true }
    );

    if (!updatedMealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    res.status(200).json({
      message: 'Meal plan updated',
      updatedMealPlan,
    });
  } catch (error) {
    next(error);
  }
}

//deleting a meal plan

export async function deleteMealPlan(req, res, next) {
  const meal_plan_id = req.params.meal_plan_id;
  const mealPlanObjID =
    mongoose.Types.ObjectId.createFromHexString(meal_plan_id);

  try {
    const deletedMealPlan = await mealModel.findOneAndDelete(mealPlanObjID);

    if (!deletedMealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }
    res
      .status(200)
      .json({ message: `Meal plan with id ${meal_plan_id} was deleted` });
  } catch (error) {
    next(error);
  }
}
