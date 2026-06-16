const express = require('express');
const router = express.Router();
const {
  getInquiries,
  getInquiryById,
  createInquiry,
  updateInquiryStatusAndNotes,
  deleteInquiry
} = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');
const { validateInquiry } = require('../middleware/validationMiddleware');

router.route('/')
  .get(protect, getInquiries)
  .post(validateInquiry, createInquiry);

router.route('/:id')
  .get(protect, getInquiryById)
  .put(protect, updateInquiryStatusAndNotes)
  .delete(protect, deleteInquiry);

module.exports = router;
