const TeamOwner = require('../../models/Tournaments/teamOwner');
const ErrorHandler = require('../../utils/errorHandler');
const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');

// create a Team   => /api/v1/register
exports.createTeamOwner = catchAsyncErrors(async (req, res, next) => {
  const { name, tournament_id } = req.body;

  const teamOwner = await TeamOwner.create({
    name,

    tournament_id,
  });
  res.status(201).json({
    success: true,
    teamOwner,
  });
});
// Get single Team   =>   /api/v1/admin/faqs
exports.getSingleteamOwner = catchAsyncErrors(async (req, res, next) => {
  const teamOwner = await TeamOwner.findById(req.params.id);
  if (!teamOwner) {
    return next(new ErrorHandler('Team not existes', 404));
  }

  res.status(200).json({
    success: true,
    teamOwner,
  });
});
exports.getUserTeams = catchAsyncErrors(async (req, res, next) => {
  const teamOwner = await TeamOwner.find({ user: req.user.id });
  if (!teamOwner) {
    return next(new ErrorHandler('Teams not existes', 404));
  }
  res.status(200).json({
    success: true,
    teamOwner,
  });
});
// get all Teams
exports.getAllTeams = catchAsyncErrors(async (req, res, next) => {
  const teamOwner = await TeamOwner.find();
  if (!teamOwner) {
    return next(new ErrorHandler('Teams not existes', 404));
  }
  res.status(200).json({
    success: true,
    teamOwner,
  });
});
// Update Team Update   =>   /api/v1/me/update
exports.updateteamOwner = catchAsyncErrors(async (req, res, next) => {
  const teamOwner = await TeamOwner.findById(req.params.id);

  if (!teamOwner) {
    return next(
      new ErrorHandler(`Team does't exist with id: ${req.params.id}`)
    );
  }

  const { name, tournament_id } = req.body;
  const newTeamData = {
    name,

    tournament_id,
  };
  const team2 = await TeamOwner.findByIdAndUpdate(req.params.id, newTeamData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    team2,
  });
});

// Delete Team   =>   /api/v1/admin/Team/:id
exports.deleteteamOwner = catchAsyncErrors(async (req, res, next) => {
  const teamOwner = await TeamOwner.findById(req.params.id);

  if (!teamOwner) {
    return next(
      new ErrorHandler(`Team does't exist with id: ${req.params.id}`)
    );
  }
  if (TeamOwner.user != req.user.id)
    return next(new ErrorHandler('Authentication problem', 400));
  // Remove image from cloudinary

  await TeamOwner.remove();

  res.status(200).json({
    success: true,
  });
});
exports.adminDeleteteamOwner = catchAsyncErrors(async (req, res, next) => {
  const teamOwner = await TeamOwner.findById(req.params.id);

  if (!teamOwner) {
    return next(
      new ErrorHandler(`Team does't exist with id: ${req.params.id}`)
    );
  }

  await TeamOwner.remove();

  res.status(200).json({
    success: true,
  });
});
