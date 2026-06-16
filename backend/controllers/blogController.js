const Blog = require('../models/Blog');

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    res.json({ success: true, data: blogs });
  } catch (error) {
    next(error);
  }
};

const getBlogBySlugOrId = async (req, res, next) => {
  const { slugOrId } = req.params;
  try {
    let blog;
    if (isNaN(slugOrId)) {
      blog = await Blog.findBySlug(slugOrId);
    } else {
      blog = await Blog.findById(parseInt(slugOrId));
    }

    if (!blog) {
      res.status(404);
      return next(new Error('Blog article not found'));
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  const { title, slug, excerpt, content, featured_image, author, published_date } = req.body;
  try {
    const existing = await Blog.findBySlug(slug);
    if (existing) {
      res.status(400);
      return next(new Error('Blog with this slug already exists'));
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      featured_image,
      author,
      published_date: published_date || new Date().toISOString().slice(0, 10)
    });

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  const { id } = req.params;
  const { title, slug, excerpt, content, featured_image, author, published_date } = req.body;
  try {
    const existing = await Blog.findById(id);
    if (!existing) {
      res.status(404);
      return next(new Error('Blog article not found'));
    }

    // Check slug conflict
    const slugConflict = await Blog.findBySlug(slug);
    if (slugConflict && slugConflict.id !== parseInt(id)) {
      res.status(400);
      return next(new Error('Blog with this slug already exists'));
    }

    const blog = await Blog.update(parseInt(id), {
      title,
      slug,
      excerpt,
      content,
      featured_image,
      author,
      published_date: published_date || existing.published_date
    });

    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existing = await Blog.findById(id);
    if (!existing) {
      res.status(404);
      return next(new Error('Blog article not found'));
    }

    const success = await Blog.delete(parseInt(id));
    res.json({ success, message: 'Blog article removed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogs,
  getBlogBySlugOrId,
  createBlog,
  updateBlog,
  deleteBlog
};
