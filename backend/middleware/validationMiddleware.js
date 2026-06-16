const validateFields = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];
    
    requiredFields.forEach((field) => {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      res.status(400);
      return next(new Error(`Missing required fields: ${missingFields.join(', ')}`));
    }

    next();
  };
};

module.exports = {
  validateFields,
  validateLogin: validateFields(['email', 'password']),
  validateCategory: validateFields(['name', 'slug']),
  validateSubcategory: validateFields(['name', 'slug', 'category_id']),
  validateProduct: validateFields(['name', 'slug', 'category_id', 'subcategory_id']),
  validateBlog: validateFields(['title', 'slug', 'content']),
  validateProject: validateFields(['title', 'slug', 'project_type']),
  validateInquiry: validateFields(['name', 'email', 'message'])
};
