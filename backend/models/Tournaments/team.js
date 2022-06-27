const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter team name'],
    trim: true,
    maxLength: [50, 'team name cannot exceed 50 characters'],
  },
  points: {
    type: Number,
    default: 0,
  },
  lossMatch: {
    type: Number,
    default: 0,
  },
  winMatch: {
    type: Number,
    default: 0,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  tournament_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tournament',
    required: true,
  },
  ownerName: {
    type: String,
    required: [true, 'Please enter TeamOwner name'],
    trim: true,
    maxLength: [50, 'TeamOwner name cannot exceed 50 characters'],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Team', teamSchema);
