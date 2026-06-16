const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryBySlugOrId,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
const { validateCategory } = require('../middleware/validationMiddleware');

router.route('/')
  .get(getCategories)
  .post(protect, validateCategory, createCategory);

router.route('/:slugOrId')
  .get(getCategoryBySlugOrId);

router.route('/:id')
  .put(protect, validateCategory, updateCategory)
  .delete(protect, deleteCategory);

module.exports = router;
