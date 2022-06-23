const Player = require('../../models/Tournaments/player');

const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');

// Admin Routes

// Register a player   => /api/v1/register
exports.createNewPlayerProfile = catchAsyncErrors(async (req, res, next) => {
  req.body.user_id = req.user.id;
  const player = await Player.create(req.body);

  res.status(201).json({
    success: true,
    player,
  });
});

// Get all player   =>
exports.getAllPlayerProfiles = catchAsyncErrors(async (req, res, next) => {
  const player = await Player.find().populate('user_id', 'name email avatar');

  res.status(200).json({
    success: true,
    player,
  });
});
// Get single player
exports.getSinglePlayerProfile = catchAsyncErrors(async (req, res, next) => {
  const player = await Player.findOne({ user_id: req.user.id });
  if (!player) {
    return next(new ErrorHandler('player [profile not exist', 404));
  }

  res.status(200).json({
    success: true,
    player,
  });
});
// Update player Update   =>   /api/v1/me/update
exports.playerUpdate = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  let player = await Player.findById(req.params.id);

  if (!player) {
    return next(new ErrorHandler('player not found', 404));
  }
  req.body.user_id = req.user.id;

  const playerdata = await Player.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    playerdata,
  });
});
exports.deletePlayer = catchAsyncErrors(async (req, res, next) => {
  const player = await Player.findById(req.params.id);

  if (!player) {
    return next(new ErrorHandler('No player found with this ID', 404));
  }

  await player.remove();

  res.status(200).json({
    success: true,
  });
});
