const Tournament = require('../../models/Tournaments/tournament');
const ErrorHandler = require('../../utils/errorHandler');
const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');
// Admin Routes

// create a Tournament   => /api/v1/register
exports.createTournament = catchAsyncErrors(async (req, res, next) => {
  let image = {
    public_id: 'DEFAULT_image',
    url: 'images/default_image.jpg',
  };

  if (req.body.image) {
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: 'TournamentImages',
    });

    image = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }
  req.body.user = req.user.id;
  const { name, noTeams, user, startingDate, endingDate } = req.body;

  const tournament = await Tournament.create({
    name,
    noTeams,
    user,
    startingDate,
    endingDate,

    image,
  });
  res.status(201).json({
    success: true,
    tournament,
  });
});
// Get single Tournament   =>   /api/v1/admin/faqs
exports.getSingleTournament = catchAsyncErrors(async (req, res, next) => {
  const tournament = await Tournament.findById(req.params.id);
  if (!tournament) {
    return next(new ErrorHandler('Tournament not existes', 404));
  }

  res.status(200).json({
    success: true,
    tournament,
  });
});
exports.getUserTournaments = catchAsyncErrors(async (req, res, next) => {
  const tournament = await Tournament.find({ user: req.user.id });
  if (!tournament) {
    return next(new ErrorHandler('Tournaments not existes', 404));
  }
  res.status(200).json({
    success: true,
    tournament,
  });
});
// get all Tournaments
exports.getAllTournaments = catchAsyncErrors(async (req, res, next) => {
  const tournament = await Tournament.find().populate(
    'user',
    'name email avatar'
  );
  if (!tournament) {
    return next(new ErrorHandler('Tournaments not existes', 404));
  }
  res.status(200).json({
    success: true,
    tournament,
  });
});
// Update Tournament Update   =>   /api/v1/me/update
// exports.updateTournament = catchAsyncErrors(async (req, res, next) => {
//   const tournament = await Tournament.findById(req.params.id);

//   if (!tournament) {
//     return next(
//       new ErrorHandler(`Tournament does't exist with id: ${req.params.id}`)
//     );
//   }
//   // Remove image from cloudinary
//   const image_id = tournament.image.public_id;
//   await cloudinary.v2.uploader.destroy(image_id);
//   let image = {
//     public_id: 'DEFAULT_image',
//     url: 'images/default_image.jpg',
//   };

//   if (req.body.image) {
//     const result = await cloudinary.v2.uploader.upload(req.body.image, {
//       folder: 'images',
//     });

//     image = {
//       public_id: result.public_id,
//       url: result.secure_url,
//     };
//   }
//   const { name, noTeams, user, startingDate, endingDate } = req.body;
//   const newTournamentData = {
//     name,
//     noTeams,
//     user,
//     startingDate,
//     endingDate,
//     image,
//   };
//   const tournament2 = await Tournament.findByIdAndUpdate(
//     req.params.id,
//     newTournamentData,
//     {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     }
//   );

//   res.status(200).json({
//     success: true,
//     tournament2,
//   });
// });
exports.updateTournament = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const tournament = await Tournament.findById(req.params.id);

  if (!tournament) {
    return next(
      new ErrorHandler(`tournament. does't exist with id: ${req.params.id}`)
    );
  }
  // Remove image from cloudinary
  const image_id = tournament.image.public_id;

  if (!req.body.public_id) {
    console.log('ok1');
    await cloudinary.v2.uploader.destroy(tournament.image.public_id);
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
    req.body.image = tournament.image;
  }

  const tournament2 = await Tournament.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    tournament2,
  });
});
// Delete Tournament   =>   /api/v1/admin/Tournament/:id
exports.deleteTournament = catchAsyncErrors(async (req, res, next) => {
  const tournament = await Tournament.findById(req.params.id);

  if (!tournament) {
    return next(
      new ErrorHandler(`Tournament does't exist with id: ${req.params.id}`)
    );
  }
  if (tournament.user != req.user.id)
    return next(new ErrorHandler('Authentication problem', 400));
  // Remove image from cloudinary
  const image_id = tournament.image.public_id;
  await cloudinary.v2.uploader.destroy(image_id);

  await tournament.remove();

  res.status(200).json({
    success: true,
  });
});
exports.adminDeleteTournament = catchAsyncErrors(async (req, res, next) => {
  const tournament = await Tournament.findById(req.params.id);

  if (!tournament) {
    return next(
      new ErrorHandler(`Tournament does't exist with id: ${req.params.id}`)
    );
  }

  // Remove image from cloudinary
  const image_id = tournament.image.public_id;
  await cloudinary.v2.uploader.destroy(image_id);

  await tournament.remove();

  res.status(200).json({
    success: true,
  });
});
