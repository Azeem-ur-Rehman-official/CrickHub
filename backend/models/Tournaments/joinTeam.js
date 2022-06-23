const mongoose = require('mongoose');

const joinSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'Player',
    required: true,
  },
  join_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: true,
  },
  tournament_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tournament',
    required: true,
  },
  teamRole: {
    type: String,

    required: true,
  },
  teamOrder: {
    type: Number,
  },
  teamStatus: {
    type: String,

    default: 'Request',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('JoinTeam', joinSchema);
