import { Router } from 'express';

const router = Router();

router.get('/:user_id/get-all-meal-plans');

router.get('/:meal_plan_id/get-meals');

router.post('/:user_id/create');

router.put('/update/:meal_plan_id');

router.delete('/delete/:meal_plan_id');

export default router;
