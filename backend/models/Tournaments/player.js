const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true,
    maxLength: [50, ' name cannot exceed 50 characters'],
  },
  imageLink: { type: String, required: [true, 'Please enter your image link'] },
  fatherName: {
    type: String,
    required: [true, 'Please enter your father name'],
    trim: true,
    maxLength: [50, 'father name cannot exceed 50 characters'],
  },
  gender: {
    type: String,
    default: 'male',
  },
  DOB: {
    type: Date,
    required: [true, 'Please enter Date of birth'],
  },
  playerRole: {
    type: String,
    required: [false, 'Please select  Player role'],
    enum: {
      values: ['Wicket Keeper', 'Bowler', 'Batsman', 'All Rounder'],
      message: 'Please select correct category for Player role',
    },
  },
  battingStyle: {
    type: String,
    required: [false, 'Please select  batting style'],
    enum: {
      values: ['Left Arm', 'Right Arm'],
      message: 'Please select correct category for Player role',
    },
  },
  bowlingStyle: {
    type: String,
    required: [false, 'Please select  bowling style'],
    enum: {
      values: ['NA', 'Fast', 'Medium', 'Spin'],
      message: 'Please select correct category for Player role',
    },
  },
  bowlingDirection: {
    type: String,
    required: [false, 'Please select  bowling direction'],
    enum: {
      values: ['leg spin', 'off spin', 'gogly', 'NA'],
      message: 'Please select correct category for Player role',
    },
  },

  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Player', playerSchema);
