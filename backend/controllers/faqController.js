const Faq = require('../models/FAQ');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');

// Admin Routes

// Register a faq   => /api/v1/register
exports.creatfaq = catchAsyncErrors(async (req, res, next) => {
  const { question, answer } = req.body;

  const faq = await Faq.create({
    question,
    answer,
  });

  res.status(201).json({
    success: true,
    faq,
  });
});

// Get all faqs   =>   /api/v1/admin/faqs
exports.allfaqs = catchAsyncErrors(async (req, res, next) => {
  const faqs = await Faq.find();

  res.status(200).json({
    success: true,
    faqs,
  });
});
// Get single faqs   =>   /api/v1/admin/faqs
exports.singlefaq = catchAsyncErrors(async (req, res, next) => {
  const faqs = await Faq.findById(req.body.id);

  res.status(200).json({
    success: true,
    faqs,
  });
});
// Update faq Update   =>   /api/v1/me/update
exports.faqUpdate = catchAsyncErrors(async (req, res, next) => {
  let faq = await Faq.findById(req.params.id);
  if (!faq) {
    return next(new ErrorHandler('faq not found', 404));
  }
  const newfaqData = {
    question: req.body.question,
    answer: req.body.answer,
  };

  const faqdata = await Faq.findByIdAndUpdate(req.params.id, newfaqData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    faqdata,
  });
});

// Delete faq   =>   /api/v1/admin/faq/:id
exports.deletefaq = catchAsyncErrors(async (req, res, next) => {
  const faq = await Faq.findById(req.params.id);

  if (!faq) {
    return next(new ErrorHandler(`faq does't exist with id: ${req.params.id}`));
  }

  await faq.remove();

  res.status(200).json({
    success: true,
  });
});
