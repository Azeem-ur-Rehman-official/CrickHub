const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  team_A_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: true,
  },
  team_B_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: true,
  },
  toss: {
    type: mongoose.Schema.ObjectId,
    ref: 'Ining',
  },
  team_A_name: {
    type: String,

    required: true,
  },
  team_B_name: {
    type: String,

    required: true,
  },
  tournament_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tournament',
    required: true,
  },
  locationName: {
    type: String,
    required: [true, 'Please share location Name of ground'],
  },
  locationLink: {
    type: String,

    required: [true, 'Please share location Link of ground'],
  },
  matchType: {
    type: String,
    required: [false, 'Please select  Player role'],
    enum: {
      values: ['simple', 'quarter-final', 'semi-final', 'final'],
      message: 'Please select correct category for match Type',
    },
    default: 'simple',
  },
  MatchDateTime: {
    type: Date,
    required: [true, 'Please fill Match Date'],
  },
  MatchCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('matchSchedule', scheduleSchema);
