const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },

  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TournamentSubscription', subscriptionSchema);
