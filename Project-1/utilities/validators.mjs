import { body, validationResult } from 'express-validator';

export function newContactRules() {
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
  ];
}

export function checkNewContact(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
