const mongoose = require('mongoose');

const IningSchema = new mongoose.Schema({
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
    ref: 'Team',
    required: [true, 'Toss is required'],
  },

  tournament: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tournament',
    required: [true, 'Tournament id not found'],
  },
  schedule: {
    type: mongoose.Schema.ObjectId,
    ref: 'matchSchedule',
    required: [true, 'Schedule id not found'],
  },
  tossDecision: {
    type: String,
    required: [true, 'Please write toss decition'],
  },
  teamA_Score: {
    type: Number,

    default: 0,
  },
  teamA_out: {
    type: Number,

    default: 0,
  },
  teamB_out: {
    type: Number,

    default: 0,
  },
  teamA_Ining_Status: {
    type: Boolean,
    default: false,
  },
  teamB_Ining_Status: {
    type: Boolean,
    default: false,
  },
  teamB_Score: {
    type: Number,

    default: 0,
  },
  teamA_over: {
    type: Number,

    default: 0,
  },
  teamA_over: {
    type: Number,

    default: 0,
  },
  teamA_balls: {
    type: Number,

    default: 0,
  },
  teamB_over: {
    type: Number,

    default: 0,
  },
  teamB_balls: {
    type: Number,

    default: 0,
  },
  overs: {
    type: Number,
    required: [true, 'Please select overs'],
    default: 20,
  },
  liveStatus: {
    type: Boolean,
    default: true,
  },
  matchDecision: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Ining', IningSchema);
