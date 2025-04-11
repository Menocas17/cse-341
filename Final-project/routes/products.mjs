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
  createProduct
);

//updating product by id
router.put(
  '/update/:product_id',
  ProductValidationRules(),
  checkRulesResults,
  updateProduct
);

//deleting product by id

router.delete('/delete/:product_id', deleteProduct);

export default router;
