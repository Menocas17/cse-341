import { body, validationResult } from 'express-validator';

export function userValidationRules(isUpdate = false) {
  return [
    body('user_email')
      .trim()
      .escape()
      [isUpdate ? 'optional' : 'notEmpty']()
      .isEmail()
      .normalizeEmail()
      .withMessage('A valid emial is required'),

    body('user_birthday')
      .optional()
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

    body('user_name')
      .optional()
      .trim()
      .isLength({ min: 2 })
      .isAlpha()
      .withMessage('Name must contain only Alpha letters'),

    body('user_lastName')
      .optional()
      .trim()
      .isLength({ min: 2 })
      .isAlpha()
      .withMessage('Name must contain only Alpha letters'),

    body('user_phone_number')
      .isMobilePhone('any', { strictMode: false })
      .optional(),

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

    body('user_address')
      .optional()
      .trim()
      .isLength({ min: 5 })
      .withMessage('Address should be at least 5 characters long'),

    body('role')
      .optional()
      .isIn(['user', 'admin'])
      .withMessage('Role must be either user or admin'),
  ];
}

export function ProductValidationRules() {
  return [
    body('product_name')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Product name is required')
      .isLength({ min: 2 })
      .withMessage('Product name must be at least 2 characters long'),

    body('product_brand')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Brand is required')
      .isLength({ min: 2 })
      .withMessage('Brand must be at least 2 characters long'),

    body('product_color')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Color is required')
      .isAlpha()
      .withMessage('Color must contain only letters'),

    body('product_description')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Description is required')
      .isLength({ min: 10 })
      .withMessage('Description must be at least 10 characters long'),

    body('product_price')
      .optional()
      .notEmpty()
      .withMessage('Price is required')
      .isFloat({ min: 0.01 })
      .withMessage('Price must be a number greater than 0'),
  ];
}

export function updateCartItemRules() {
  return [
    body('quantity')
      .notEmpty()
      .withMessage('Quantity is required')
      .isInt({ min: 1 })
      .withMessage('Quantity must be an integer greater than 0'),
  ];
}

export function reviewsValidationRules() {
  return [
    body('review_rating')
      .notEmpty()
      .withMessage('Rating is required')
      .isInt({ min: 1, max: 10 })
      .withMessage('Rating must be a number between 1 and 10'),

    body('review_text')
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Review text must be less than 1000 characters'),
  ];
}

export function loginValidationRules() {
  return [
    body('user_email')
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage('A valid emial is required'),
  ];
}

export function checkRulesResults(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
