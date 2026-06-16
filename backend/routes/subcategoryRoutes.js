const express = require('express');
const router = express.Router();
const {
  getSubcategories,
  getSubcategoryBySlugOrId,
  getSubcategoriesByCategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory
} = require('../controllers/subcategoryController');
const { protect } = require('../middleware/authMiddleware');
const { validateSubcategory } = require('../middleware/validationMiddleware');

router.route('/')
  .get(getSubcategories)
  .post(protect, validateSubcategory, createSubcategory);

router.route('/:slugOrId')
  .get(getSubcategoryBySlugOrId);

router.route('/category/:categoryId')
  .get(getSubcategoriesByCategory);

router.route('/:id')
  .put(protect, validateSubcategory, updateSubcategory)
  .delete(protect, deleteSubcategory);

module.exports = router;
