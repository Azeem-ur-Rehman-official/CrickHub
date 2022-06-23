const User = require('../models/user');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
exports.getNotification = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({
    _id: req.user.id,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

exports.sendNotification = catchAsyncErrors(async (req, res, next) => {
  const { heading, content } = req.body;

  const notification = {
    heading,
    content,
  };
  const id = '61cb2f11e4df051e40c036a9';
  //const users = await User.find({ role: 'user' });
  // users.map((val) => {
  //   console.log(val);
  //   // val.notifications.push(notification);
  //   // await val.save({ validateBeforeSave: false });
  // });
  const users = await User.updateMany(
    { role: 'user' },

    { $push: { notifications: { heading: heading, content: content } } },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
    users,
  });
});
exports.notificationStatus = catchAsyncErrors(async (req, res, next) => {
  console.log(req.user.id);
  console.log('okokko');
  const sample = await User.findOne({
    _id: req.user.id,
    'notifications._id': req.params.id,
  });
  console.log(sample);
  const users = await User.updateOne(
    { _id: req.user.id, 'notifications._id': req.params.id },

    {
      $set: {
        'notifications.$.status': 'read',
      },
    }
  );

  res.status(200).json({
    success: true,
  });
});
