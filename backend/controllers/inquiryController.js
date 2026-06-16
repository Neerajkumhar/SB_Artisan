const Inquiry = require('../models/Inquiry');

const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.findAll();
    res.json({ success: true, data: inquiries });
  } catch (error) {
    next(error);
  }
};

const getInquiryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const inquiry = await Inquiry.findById(parseInt(id));
    if (!inquiry) {
      res.status(404);
      return next(new Error('Inquiry log not found'));
    }
    res.json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

const createInquiry = async (req, res, next) => {
  const { name, company_name, email, phone, country, message, inquiry_type, status, notes } = req.body;
  try {
    const inquiry = await Inquiry.create({
      name,
      company_name,
      email,
      phone,
      country,
      message,
      inquiry_type,
      status: status || 'New',
      notes: notes || ''
    });

    res.status(201).json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

const updateInquiryStatusAndNotes = async (req, res, next) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  try {
    const existing = await Inquiry.findById(id);
    if (!existing) {
      res.status(404);
      return next(new Error('Inquiry log not found'));
    }

    const updated = await Inquiry.updateStatusAndNotes(parseInt(id), {
      status: status || existing.status,
      notes: notes !== undefined ? notes : existing.notes
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

const deleteInquiry = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existing = await Inquiry.findById(id);
    if (!existing) {
      res.status(404);
      return next(new Error('Inquiry log not found'));
    }

    const success = await Inquiry.delete(parseInt(id));
    res.json({ success, message: 'Inquiry log removed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInquiries,
  getInquiryById,
  createInquiry,
  updateInquiryStatusAndNotes,
  deleteInquiry
};
