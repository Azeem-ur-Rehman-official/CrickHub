const Schedule = require('../../models/Tournaments/schedule');
const Team = require('../../models/Tournaments/team');
const ErrorHandler = require('../../utils/errorHandler');
const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');

// Admin Routes

// create a schedule   => /api/v1/register
exports.createSchedule = catchAsyncErrors(async (req, res, next) => {
  const team = await Team.findOne({
    name: req.body.team_A_id,
    tournament_id: req.body.tournament_id,
  });
  const team2 = await Team.findOne({
    name: req.body.team_B_id,
    tournament_id: req.body.tournament_id,
  });

  if (team && team2) {
    req.body.team_A_id = team._id;
    req.body.team_B_id = team2._id;
    req.body.team_A_name = team.name;
    req.body.team_B_name = team2.name;
  }
  const schedule = await Schedule.create(req.body);
  res.status(201).json({
    success: true,
    schedule,
  });
});

// Get single schedule   =>   /api/v1/admin/faqs
exports.getSingleSchedule = catchAsyncErrors(async (req, res, next) => {
  const schedule = await Schedule.findById(req.params.id);

  if (!schedule) {
    return next(new ErrorHandler('schedule not existes', 404));
  }

  res.status(200).json({
    success: true,
    schedule,
  });
});
exports.getSingleTournamentSchedules = catchAsyncErrors(
  async (req, res, next) => {
    console.log(req.params.id);
    const schedule = await Schedule.find({ tournament_id: req.params.id })
      .populate('team_A_id')
      .populate('team_B_id');
    if (!schedule) {
      return next(new ErrorHandler('schedules not existes', 404));
    }
    console.log(schedule);
    res.status(200).json({
      success: true,
      schedule,
    });
  }
);
// get all schedules
// exports.getAllSchedules = catchAsyncErrors(async (req, res, next) => {
//   const schedule = await Schedule.find();
//   if (!schedule) {
//     return next(new ErrorHandler('schedules not existes', 404));
//   }
//   res.status(200).json({
//     success: true,
//     schedule,
//   });
// });
// Update schedule Update   =>   /api/v1/me/update
exports.updateSchedule = catchAsyncErrors(async (req, res, next) => {
  const schedule = await Schedule.findById(req.params.id);

  if (!schedule) {
    return next(
      new ErrorHandler(`schedule does't exist with id: ${req.params.id}`)
    );
  }
  const team = await Team.findOne({ name: req.body.team_A_id });
  const team2 = await Team.findOne({ name: req.body.team_B_id });

  if (team && team2) {
    req.body.team_A_id = team._id;
    req.body.team_B_id = team2._id;
    req.body.team_A_name = team.name;
    req.body.team_B_name = team2.name;
  }
  // Remove image from cloudinary
  const schedule2 = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    schedule2,
  });
});

// // Delete schedule   =>   /api/v1/admin/schedule/:id

exports.adminDeleteSchedule = catchAsyncErrors(async (req, res, next) => {
  const schedule = await Schedule.findById(req.params.id);

  if (!schedule) {
    return next(
      new ErrorHandler(`schedule does't exist with id: ${req.params.id}`)
    );
  }
  console.log('ok');
  await Schedule.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
  });
});
