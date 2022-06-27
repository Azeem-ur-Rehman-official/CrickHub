const Ining = require('../../models/Tournaments/Inings');
const LiveScore = require('../../models/Tournaments/liveScore');
const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');

// Admin Routes

// create a schedule   => /api/v1/register
exports.createMatchLiveScore = catchAsyncErrors(async (req, res, next) => {
  const liveScore = await LiveScore.create(req.body);
  console.log('ok');
  res.status(201).json({
    success: true,
    liveScore,
  });
});
exports.topPlayersBatsmanList = catchAsyncErrors(async (req, res, next) => {
  const liveScore = await LiveScore.aggregate([
    {
      $group: {
        _id: '$batsman',
        score: { $sum: '$batsmanScore' },
        playedBalls: { $sum: '$playedBalls' },
        out: { $sum: '$out' },
        sixs: { $sum: '$sixs' },
        fours: { $sum: '$fours' },
      },
    },
    {
      $lookup: {
        from: 'players',
        localField: '_id',
        foreignField: '_id',
        as: 'allplayers',
      },
    },
  ]);

  // const liveScore = await LiveScore.aggregate([
  //   { $group: { _id: '$batsman', score: { $sum: '$batsmanScore' } } },
  // ]).populate('$_id');
  //{ $group: { _id: '$batingTeamID', score: { $sum: '$batsmanScore' } } },
  res.status(201).json({
    success: true,
    liveScore,
  });
});
exports.topPlayersBlowlerList = catchAsyncErrors(async (req, res, next) => {
  const liveScore = await LiveScore.aggregate([
    {
      $group: {
        _id: '$bowler',
        score: { $sum: '$totalScore' },
        overs: { $sum: '$playedBalls' },
        out: { $sum: '$out' },
        playedBalls: { $sum: '$playedBalls' },
        noBalls: { $sum: '$noBalls' },
        wideBalls: { $sum: '$wideBalls' },
        sixs: { $sum: '$sixs' },
        fours: { $sum: '$fours' },
      },
    },
    { $sort: { score: 1 } },
    {
      $lookup: {
        from: 'players',
        localField: '_id',
        foreignField: '_id',
        as: 'allplayers',
      },
    },
  ]);

  // const liveScore = await LiveScore.aggregate([
  //   { $group: { _id: '$batsman', score: { $sum: '$batsmanScore' } } },
  // ]).populate('$_id');
  //{ $group: { _id: '$batingTeamID', score: { $sum: '$batsmanScore' } } },
  res.status(201).json({
    success: true,
    liveScore,
  });
});
