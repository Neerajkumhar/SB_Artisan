const Category = require('../models/Category');

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

const getCategoryBySlugOrId = async (req, res, next) => {
  const { slugOrId } = req.params;
  try {
    let category;
    if (isNaN(slugOrId)) {
      category = await Category.findBySlug(slugOrId);
    } else {
      category = await Category.findById(parseInt(slugOrId));
    }

    if (!category) {
      res.status(404);
      return next(new Error('Category not found'));
    }

    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  const { name, slug, description } = req.body;
  try {
    // Check if slug is unique
    const existing = await Category.findBySlug(slug);
    if (existing) {
      res.status(400);
      return next(new Error('Category with this slug already exists'));
    }

    const category = await Category.create({ name, slug, description });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name, slug, description } = req.body;
  try {
    const existing = await Category.findById(id);
    if (!existing) {
      res.status(404);
      return next(new Error('Category not found'));
    }

    // Check slug conflict with other categories
    const slugConflict = await Category.findBySlug(slug);
    if (slugConflict && slugConflict.id !== parseInt(id)) {
      res.status(400);
      return next(new Error('Category with this slug already exists'));
    }

    const category = await Category.update(parseInt(id), { name, slug, description });
    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existing = await Category.findById(id);
    if (!existing) {
      res.status(404);
      return next(new Error('Category not found'));
    }

    const success = await Category.delete(parseInt(id));
    res.json({ success, message: 'Category removed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategoryBySlugOrId,
  createCategory,
  updateCategory,
  deleteCategory
};
