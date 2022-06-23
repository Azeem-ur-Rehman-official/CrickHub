const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  tournament_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tournament',
    required: true,
  },
  team_A: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: true,
  },
  team_B: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: true,
  },
  Toss: {
    type: Boolean,
    default: 'none',
  },
  decision: {
    type: Boolean,
    default: 'none',
  },
  Overs: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Match', matchSchema);
