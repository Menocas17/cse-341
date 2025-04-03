import { body, validationResult } from 'express-validator';

export function newUserRules() {
  return [
    body('email')
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage('A valid emial is required'),

    body('birthday')
      .trim()
      .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/)
      .withMessage('The birthday has to be in the following format: YYYY-MM-DD')
      .custom((value) => {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return false;
        }
        return true;
      })
      .withMessage('The date is not valid'),

    body('name')
      .trim()
      .isLength({ min: 2 })
      .isAlpha()
      .withMessage('Name must contain only Alpha letters'),

    body('lastName')
      .trim()
      .isLength({ min: 2 })
      .isAlpha()
      .withMessage('Name must contain only Alpha letters'),

    body('phoneNumber').isMobilePhone('any', { strictMode: false }),

    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least one lowercase letter')
      .matches(/[0-9]/)
      .withMessage('Password must contain at least one number')
      .matches(/[@$!%*?&]/)
      .withMessage(
        'Password must contain at least one special character (@$!%*?&)'
      ),
  ];
}

export function UpdateUserRules() {
  return [
    body('email')
      .trim()
      .escape()
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage('A valid emial is required'),

    body('birthday')
      .trim()
      .optional()
      .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/)
      .withMessage('The birthday has to be in the following format: YYYY-MM-DD')
      .custom((value) => {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return false;
        }
        return true;
      })
      .withMessage('The date is not valid'),

    body('name')
      .trim()
      .isLength({ min: 2 })
      .isAlpha()
      .optional()
      .withMessage('Name must contain only Alpha letters'),

    body('lastName')
      .trim()
      .isLength({ min: 2 })
      .isAlpha()
      .optional()
      .withMessage('Name must contain only Alpha letters'),

    body('phoneNumber').isMobilePhone('any', { strictMode: false }).optional(),

    body('password')
      .optional()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least one lowercase letter')
      .matches(/[0-9]/)
      .withMessage('Password must contain at least one number')
      .matches(/[@$!%*?&]/)
      .withMessage(
        'Password must contain at least one special character (@$!%*?&)'
      ),
  ];
}

export function mealPlanRules() {
  return [
    body('mealPlan_name')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Meal plan name must be at least 3 characters long'),

    body('meals.*.nutrition_info.fat')
      .isString()
      .withMessage('Fat should be a string'),

    body('meals.*.nutrition_info.protein')
      .isString()
      .withMessage('Protein should be a string'),

    body('meals.*.nutrition_info.carbohydrates')
      .isString()
      .withMessage('Carbohydrates should be a string'),

    body('meals.*.nutrition_info.total_kcal')
      .isString()
      .withMessage('Total kcal should be a string'),
  ];
}
export function UpdatemealPlanRules() {
  return [
    body('mealPlan_name')
      .optional()
      .trim()
      .isLength({ min: 3 })
      .withMessage('Meal plan name must be at least 3 characters long'),

    body('meals.*.nutrition_info.fat')
      .optional()
      .isString()
      .withMessage('Fat should be a string'),

    body('meals.*.nutrition_info.protein')
      .optional()
      .isString()
      .withMessage('Protein should be a string'),

    body('meals.*.nutrition_info.carbohydrates')
      .optional()
      .isString()
      .withMessage('Carbohydrates should be a string'),

    body('meals.*.nutrition_info.total_kcal')
      .optional()
      .isString()
      .withMessage('Total kcal should be a string'),
  ];
}

export function checkRulesResults(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
