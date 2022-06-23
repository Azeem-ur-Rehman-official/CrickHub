const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please enter FAQ name'],

    maxLength: [200, 'FAQ name cannot exceed 200 characters'],
  },

  answer: {
    type: String,
    required: [true, 'Please enter FAQ description'],
  },
});

module.exports = mongoose.model('FAQ', FAQSchema);
