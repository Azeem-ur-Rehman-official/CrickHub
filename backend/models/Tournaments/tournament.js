const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter Tournament name'],
    trim: true,
    maxLength: [50, 'Tournament name cannot exceed 50 characters'],
  },
  noTeams: {
    type: Number,
    required: [true, 'Please enter no of teams'],
    max: [20, 'teams cannot exceed from 20'],
    default: 0.0,
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

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  startingDate: {
    type: Date,
    required: [true, 'Please enter starting date'],
  },
  endingDate: {
    type: Date,
    required: [true, 'Please enter ending date'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Tournament', tournamentSchema);
