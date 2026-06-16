const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogBySlugOrId,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const { validateBlog } = require('../middleware/validationMiddleware');

router.route('/')
  .get(getBlogs)
  .post(protect, validateBlog, createBlog);

router.route('/:slugOrId')
  .get(getBlogBySlugOrId);

router.route('/:id')
  .put(protect, validateBlog, updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;
