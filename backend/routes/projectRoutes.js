const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectBySlugOrId,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { validateProject } = require('../middleware/validationMiddleware');

router.route('/')
  .get(getProjects)
  .post(protect, validateProject, createProject);

router.route('/:slugOrId')
  .get(getProjectBySlugOrId);

router.route('/:id')
  .put(protect, validateProject, updateProject)
  .delete(protect, deleteProject);

module.exports = router;
