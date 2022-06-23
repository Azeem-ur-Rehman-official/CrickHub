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
exports.topPlayersList = catchAsyncErrors(async (req, res, next) => {
  const liveScore = await LiveScore.aggregate([
    { $group: { _id: '$batingTeamID', score: { $sum: '$batsmanScore' } } },
  ]);

  res.status(201).json({
    success: true,
    liveScore,
  });
});
