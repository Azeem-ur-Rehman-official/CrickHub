const mongoose = require('mongoose');

const PointsTableSchema = new mongoose.Schema({
  winnerTeam: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: true,
  },
  loserTeam: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: true,
  },

  tournament: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tournament',
    required: [true, 'Tournament id not found'],
  },
  Ining: {
    type: mongoose.Schema.ObjectId,
    ref: 'Ining',
    required: [true, 'Ining id not found'],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PointsTable', PointsTableSchema);
