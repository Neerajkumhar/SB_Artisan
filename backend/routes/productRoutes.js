const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductBySlugOrId,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { validateProduct } = require('../middleware/validationMiddleware');

router.route('/')
  .get(getProducts)
  .post(protect, validateProduct, createProduct);

router.route('/:slugOrId')
  .get(getProductBySlugOrId);

router.route('/:id')
  .put(protect, validateProduct, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
