import { Router } from 'express';
import {
  getAllMealPlans,
  getMealPlan,
  createMealPlan,
  updatingMealPlan,
  deleteMealPlan,
} from '../controllers/mealsController.mjs';
import {
  mealPlanRules,
  UpdatemealPlanRules,
  checkRulesResults,
} from '../middlewares/validators.mjs';
import { handleErrors } from '../middlewares/handleErrors.mjs';

const router = Router();

//route for get all the meal plans for a user
router.get('/:user_id/get-all-meal-plans', handleErrors(getAllMealPlans));

// route for get an specific meal plan
router.get('/:meal_plan_id', handleErrors(getMealPlan));

//route for creating a new meal plan for an user
router.post(
  '/:user_id/create',
  mealPlanRules(),
  checkRulesResults,
  handleErrors(createMealPlan)
);

//route for updating an specifin meal plan
router.put(
  '/update/:meal_plan_id/',
  UpdatemealPlanRules(),
  checkRulesResults,
  handleErrors(updatingMealPlan)
);

//route for delting a meal plan
router.delete('/delete/:meal_plan_id', handleErrors(deleteMealPlan));

export default router;
