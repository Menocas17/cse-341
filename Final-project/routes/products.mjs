import { Router } from 'express';
import {
  getAllProducts,
  productById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productsController.mjs';
import {
  ProductValidationRules,
  checkRulesResults,
} from '../middlewares/validations.mjs';
import { loginProtection } from '../middlewares/authenticaction.mjs';
import { restrictTo } from '../middlewares/authorization.mjs';
const router = Router();

//getting all products route
router.get('/', getAllProducts);

//getting product by id
router.get('/:product_id', productById);

//Creating a new product
router.post(
  '/create',
  ProductValidationRules(),
  checkRulesResults,
  loginProtection,
  restrictTo('admin'),
  createProduct
);

//updating product by id
router.put(
  '/update/:product_id',
  ProductValidationRules(),
  checkRulesResults,
  loginProtection,
  restrictTo('admin'),
  updateProduct
);

//deleting product by id

router.delete(
  '/delete/:product_id',
  loginProtection,
  restrictTo('admin'),
  deleteProduct
);

export default router;
