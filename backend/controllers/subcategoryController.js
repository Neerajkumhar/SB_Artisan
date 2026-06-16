const Subcategory = require('../models/Subcategory');

const getSubcategories = async (req, res, next) => {
  try {
    const subcategories = await Subcategory.findAll();
    res.json({ success: true, data: subcategories });
  } catch (error) {
    next(error);
  }
};

const getSubcategoryBySlugOrId = async (req, res, next) => {
  const { slugOrId } = req.params;
  try {
    let subcategory;
    if (isNaN(slugOrId)) {
      subcategory = await Subcategory.findBySlug(slugOrId);
    } else {
      subcategory = await Subcategory.findById(parseInt(slugOrId));
    }

    if (!subcategory) {
      res.status(404);
      return next(new Error('Subcategory not found'));
    }

    res.json({ success: true, data: subcategory });
  } catch (error) {
    next(error);
  }
};

const getSubcategoriesByCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const subcategories = await Subcategory.findByCategoryId(parseInt(categoryId));
    res.json({ success: true, data: subcategories });
  } catch (error) {
    next(error);
  }
};

const createSubcategory = async (req, res, next) => {
  const { category_id, name, slug, description } = req.body;
  try {
    // Check if slug is unique
    const existing = await Subcategory.findBySlug(slug);
    if (existing) {
      res.status(400);
      return next(new Error('Subcategory with this slug already exists'));
    }

    const subcategory = await Subcategory.create({ category_id, name, slug, description });
    res.status(201).json({ success: true, data: subcategory });
  } catch (error) {
    next(error);
  }
};

const updateSubcategory = async (req, res, next) => {
  const { id } = req.params;
  const { category_id, name, slug, description } = req.body;
  try {
    const existing = await Subcategory.findById(id);
    if (!existing) {
      res.status(404);
      return next(new Error('Subcategory not found'));
    }

    // Check slug conflict
    const slugConflict = await Subcategory.findBySlug(slug);
    if (slugConflict && slugConflict.id !== parseInt(id)) {
      res.status(400);
      return next(new Error('Subcategory with this slug already exists'));
    }

    const subcategory = await Subcategory.update(parseInt(id), { category_id, name, slug, description });
    res.json({ success: true, data: subcategory });
  } catch (error) {
    next(error);
  }
};

const deleteSubcategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existing = await Subcategory.findById(id);
    if (!existing) {
      res.status(404);
      return next(new Error('Subcategory not found'));
    }

    const success = await Subcategory.delete(parseInt(id));
    res.json({ success, message: 'Subcategory removed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSubcategories,
  getSubcategoryBySlugOrId,
  getSubcategoriesByCategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory
};
