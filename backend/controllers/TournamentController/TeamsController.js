const Team = require('../../models/Tournaments/team');
const Join = require('../../models/Tournaments/joinTeam');

const ErrorHandler = require('../../utils/errorHandler');
const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');
// Admin Routes

// create a Team   => /api/v1/register
exports.createTeam = catchAsyncErrors(async (req, res, next) => {
  let image = {
    public_id: 'DEFAULT_image',
    url: 'images/default_image.jpg',
  };

  if (req.body.image) {
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: 'TeamImages',
    });

    image = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }
  req.body.image = image;

  const team = await Team.create(req.body);

  res.status(201).json({
    success: true,
    team,
  });
});
exports.joinTournamentTeam = catchAsyncErrors(async (req, res, next) => {
  const data = await Join.findOne({
    user: req.body.user,
    tournament_id: req.body.tournament_id,
  });

  if (data && data.tournament_id == req.body.tournament_id) {
    return next(new ErrorHandler('Tournament has Already Joined', 400));
  }

  const team = await Team.findById(req.body.join_id).populate('tournament_id');

  if (team.tournament_id._id != req.body.tournament_id)
    return next(new ErrorHandler('Team Not Found', 400));

  const join = await Join.create(req.body);

  res.status(201).json({
    success: true,
    join,
  });
});
exports.getSingleTeamSquad = catchAsyncErrors(async (req, res, next) => {
  const join = await Join.find({ join_id: req.params.id }).populate('user');

  if (!join) {
    return next(new ErrorHandler('Teams Squad not existes', 404));
  }

  res.status(200).json({
    success: true,
    join,
  });
});
// Get single Team   =>   /api/v1/admin/faqs
exports.getSingleTeam = catchAsyncErrors(async (req, res, next) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    return next(new ErrorHandler('Team not existes', 404));
  }

  res.status(200).json({
    success: true,
    team,
  });
});
exports.getSingleTournamentTeams = catchAsyncErrors(async (req, res, next) => {
  const team = await Team.find({ tournament_id: req.params.id });
  if (!team) {
    return next(new ErrorHandler('Teams not existes', 404));
  }

  res.status(200).json({
    success: true,
    team,
  });
});
// get all Teams
exports.getAllTeams = catchAsyncErrors(async (req, res, next) => {
  const team = await Team.find();
  if (!team) {
    return next(new ErrorHandler('Teams not existes', 404));
  }
  res.status(200).json({
    success: true,
    team,
  });
});
//get live match teamA teamB
exports.getLiveMatchTeams = catchAsyncErrors(async (req, res, next) => {
  const team = await Team.find({
    _id: { $in: [req.body.teamA, req.body.teamB] },
  });
  if (!team) {
    return next(new ErrorHandler('Teams not existes', 404));
  }

  res.status(200).json({
    success: true,
    team,
  });
});
// Update Team Update   =>   /api/v1/me/update
exports.updateTeam = catchAsyncErrors(async (req, res, next) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return next(
      new ErrorHandler(`Team does't exist with id: ${req.params.id}`)
    );
  }
  // Remove image from cloudinary
  const image_id = team.image.public_id;

  if (!req.body.public_id) {
    await cloudinary.v2.uploader.destroy(team.image.public_id);
    let image = {
      public_id: 'DEFAULT_image',
      url: 'images/default_image.jpg',
    };

    if (req.body.image) {
      const result = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: 'images',
      });

      image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
      req.body.image = image;
    }
  } else {
    req.body.image = team.image;
  }

  const team2 = await Team.findByIdAndUpdate(req.params.id, req.body, {
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

exports.adminDeleteTeam = catchAsyncErrors(async (req, res, next) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return next(
      new ErrorHandler(`Team does't exist with id: ${req.params.id}`)
    );
  }

  // Remove image from cloudinary
  const image_id = team.image.public_id;
  await cloudinary.v2.uploader.destroy(image_id);

  await team.remove();

  res.status(200).json({
    success: true,
  });
});

// Delete Team   =>   /api/v1/admin/Team/:id

exports.adminDeleteTeamSquad = catchAsyncErrors(async (req, res, next) => {
  const Squad = await Join.findById(req.params.id);

  if (!Squad) {
    return next(
      new ErrorHandler(`Team Squad does't exist with id: ${req.params.id}`)
    );
  }

  await Squad.remove();

  res.status(200).json({
    success: true,
  });
});
exports.acceptRequestTeamSquad = catchAsyncErrors(async (req, res, next) => {
  const Squad = await Join.findById(req.params.id);

  if (!Squad) {
    return next(
      new ErrorHandler(`Team Squad does't exist with id: ${req.params.id}`)
    );
  }
  Squad.teamStatus = 'Accepted';
  await Squad.save();

  res.status(200).json({
    success: true,
  });
});
