const Project = require('../models/Project');

const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

const getProjectBySlugOrId = async (req, res, next) => {
  const { slugOrId } = req.params;
  try {
    let project;
    if (isNaN(slugOrId)) {
      project = await Project.findBySlug(slugOrId);
    } else {
      project = await Project.findById(parseInt(slugOrId));
    }

    if (!project) {
      res.status(404);
      return next(new Error('Project case study not found'));
    }

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  const { title, slug, project_type, location, client_name, description, image_url, completion_year } = req.body;
  try {
    const existing = await Project.findBySlug(slug);
    if (existing) {
      res.status(400);
      return next(new Error('Project with this slug already exists'));
    }

    const project = await Project.create({
      title,
      slug,
      project_type,
      location,
      client_name,
      description,
      image_url,
      completion_year: completion_year || new Date().getFullYear()
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  const { id } = req.params;
  const { title, slug, project_type, location, client_name, description, image_url, completion_year } = req.body;
  try {
    const existing = await Project.findById(id);
    if (!existing) {
      res.status(404);
      return next(new Error('Project case study not found'));
    }

    // Check slug conflict
    const slugConflict = await Project.findBySlug(slug);
    if (slugConflict && slugConflict.id !== parseInt(id)) {
      res.status(400);
      return next(new Error('Project with this slug already exists'));
    }

    const project = await Project.update(parseInt(id), {
      title,
      slug,
      project_type,
      location,
      client_name,
      description,
      image_url,
      completion_year: completion_year || existing.completion_year
    });

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existing = await Project.findById(id);
    if (!existing) {
      res.status(404);
      return next(new Error('Project case study not found'));
    }

    const success = await Project.delete(parseInt(id));
    res.json({ success, message: 'Project case study removed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectBySlugOrId,
  createProject,
  updateProject,
  deleteProject
};
