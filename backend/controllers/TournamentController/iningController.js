const Ining = require('../../models/Tournaments/Inings');
const Team = require('../../models/Tournaments/team');
const Schedule = require('../../models/Tournaments/schedule');
const ErrorHandler = require('../../utils/errorHandler');
const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');

// Admin Routes

// create a schedule   => /api/v1/register
exports.createIning = catchAsyncErrors(async (req, res, next) => {
  const schedule = await Schedule.findById(req.body.schedule);

  if (schedule) {
    req.body.tournament_id = schedule.tournament_id;
  } else {
    return next(new ErrorHandler('schedule is not found', 404));
  }
  const team = await Team.findOne({
    name: req.body.toss,
    tournament_id: schedule.tournament_id,
  });
  if (team) {
    req.body.toss = team._id;
  } else {
    return next(new ErrorHandler('team is not found', 404));
  }

  const ining = await Ining.create(req.body);
  schedule.toss = ining._id;
  await schedule.save();
  res.status(201).json({
    success: true,
    ining,
  });
});

// Get single schedule   =>   /api/v1/admin/faqs
exports.getSingleMatchIning = catchAsyncErrors(async (req, res, next) => {
  const ining = await Ining.findOne({ schedule: req.params.id })
    .populate('toss')
    .populate('schedule');

  if (!ining) {
    return next(new ErrorHandler('Ining not existes', 404));
  }

  res.status(200).json({
    success: true,
    ining,
  });
});
// exports.getSingleTournamentSchedules = catchAsyncErrors(
//   async (req, res, next) => {
//     console.log(req.params.id);
//     const ining = await Ining.find({ tournament_id: req.params.id })
//       .populate('team_A_id')
//       .populate('team_B_id');
//     if (!schedule) {
//       return next(new ErrorHandler('schedules not existes', 404));
//     }
//     console.log(schedule);
//     res.status(200).json({
//       success: true,
//       ining,
//     });
//   }
// );
//get all live Ining
exports.getAllInings = catchAsyncErrors(async (req, res, next) => {
  const ining = await Ining.find({ liveStatus: true })
    .populate('toss')
    .populate('schedule')
    .populate('team_A_id')
    .populate('team_B_id');
  if (!ining) {
    return next(new ErrorHandler('schedules not existes', 404));
  }
  res.status(200).json({
    success: true,
    ining,
  });
});
//get all previous Ining
exports.getAllPastInings = catchAsyncErrors(async (req, res, next) => {
  const ining = await Ining.find({ liveStatus: false })
    .populate('toss')
    .populate('schedule')
    .populate('team_A_id')
    .populate('team_B_id');
  if (!ining) {
    return next(new ErrorHandler('schedules not existes', 404));
  }
  res.status(200).json({
    success: true,
    ining,
  });
});
//get all schedules
exports.getSingleInings = catchAsyncErrors(async (req, res, next) => {
  console.log('ok');
  const ining = await Ining.findById(req.params.id)
    .populate('toss')
    .populate('schedule')
    .populate('team_A_id')
    .populate('team_B_id');
  console.log(ining);
  if (!ining) {
    return next(new ErrorHandler('schedules not existes', 404));
  }
  res.status(200).json({
    success: true,
    ining,
  });
});
// // Update schedule Update   =>   /api/v1/me/update
// exports.updateSchedule = catchAsyncErrors(async (req, res, next) => {
//   console.log(req.body);
//   const ining= await Ining.findById(req.params.id);

//   if (!schedule) {
//     return next(
//       new ErrorHandler(`schedule does't exist with id: ${req.params.id}`)
//     );
//   }
//   // Remove image from cloudinary

//   const schedule2 = await Ining.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   res.status(200).json({
//     success: true,
//     schedule2,
//   });
// });

// // Delete schedule   =>   /api/v1/admin/schedule/:id

exports.adminDeleteIning = catchAsyncErrors(async (req, res, next) => {
  const ining = await Ining.findById(req.params.id);

  if (!ining) {
    return next(
      new ErrorHandler(`Ining does't exist with id: ${req.params.id}`)
    );
  }

  await Ining.remove();

  res.status(200).json({
    success: true,
  });
});
