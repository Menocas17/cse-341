import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  meal_name: String,
  ingredients: { type: Map, of: String },
  nutrition_info: {
    fat: String,
    protein: String,
    carbohydrates: String,
    total_kcal: String,
  },
  _id: false,
});

const mealPlanSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  meals: { type: [mealSchema] },
  mealPlan_name: String,
});

export const mealModel = mongoose.model('meals', mealPlanSchema);
