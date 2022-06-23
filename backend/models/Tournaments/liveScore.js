const mongoose = require('mongoose');

const LiveScoreSchema = new mongoose.Schema({
  toss: {
    type: mongoose.Schema.ObjectId,
    ref: 'Ining',
    required: [true, 'Toss id required'],
  },
  batingTeamID: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Bating Team ID required'],
  },
  over: {
    type: Number,
    required: [true, 'Over is required'],
  },
  bowler: {
    type: mongoose.Schema.ObjectId,
    ref: 'JoinTeam',
    required: [true, 'Bowler id required'],
  },

  noBalls: {
    type: Number,
  },
  wideBalls: {
    type: Number,
  },
  batsman: {
    type: mongoose.Schema.ObjectId,
    ref: 'JoinTeam',
    required: [true, 'Batsman id required'],
  },
  playedBalls: {
    type: Number,
    required: [true, 'Played Balls required'],
  },

  sixs: {
    type: Number,
    default: 0,
  },
  fours: {
    type: Number,
    default: 0,
  },
  out: {
    type: Boolean,
  },
  batsmanScore: {
    type: Number,
    default: 0,
  },
  totalScore: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LiveScore', LiveScoreSchema);
