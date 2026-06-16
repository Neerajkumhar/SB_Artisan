const Product = require('../models/Product');

const getProducts = async (req, res, next) => {
  const { search, category, subcategory, featured } = req.query;
  try {
    const filters = {};
    if (search) filters.search = search;
    if (category) filters.category = category;
    if (subcategory) filters.subcategory = subcategory;
    if (featured !== undefined) filters.featured = featured === 'true' || featured === '1';

    const products = await Product.findAll(filters);
    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

const getProductBySlugOrId = async (req, res, next) => {
  const { slugOrId } = req.params;
  try {
    let product;
    if (isNaN(slugOrId)) {
      product = await Product.findBySlug(slugOrId);
    } else {
      product = await Product.findById(parseInt(slugOrId));
    }

    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  const {
    category_id,
    subcategory_id,
    name,
    slug,
    description,
    material,
    dimensions,
    price,
    featured,
    images // Array of { url, is_primary }
  } = req.body;

  try {
    // Check if slug is unique
    const existing = await Product.findBySlug(slug);
    if (existing) {
      res.status(400);
      return next(new Error('Product with this slug already exists'));
    }

    const product = await Product.create({
      category_id,
      subcategory_id,
      name,
      slug,
      description,
      material,
      dimensions,
      price,
      featured,
      images
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const {
    category_id,
    subcategory_id,
    name,
    slug,
    description,
    material,
    dimensions,
    price,
    featured,
    images
  } = req.body;

  try {
    const existing = await Product.findById(id);
    if (!existing) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    // Check slug conflict
    const slugConflict = await Product.findBySlug(slug);
    if (slugConflict && slugConflict.id !== parseInt(id)) {
      res.status(400);
      return next(new Error('Product with this slug already exists'));
    }

    const product = await Product.update(parseInt(id), {
      category_id,
      subcategory_id,
      name,
      slug,
      description,
      material,
      dimensions,
      price,
      featured,
      images
    });

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existing = await Product.findById(id);
    if (!existing) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    const success = await Product.delete(parseInt(id));
    res.json({ success, message: 'Product removed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductBySlugOrId,
  createProduct,
  updateProduct,
  deleteProduct
};
