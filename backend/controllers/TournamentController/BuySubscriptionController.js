const Subscription = require('../../models/Tournaments/tournamentSubscription');

const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');
const ErrorHandler = require('../../utils/errorHandler');
// Create new subscription   =>   /api/v1/user/subscription/buy
exports.subscriptionBuyTournament = catchAsyncErrors(async (req, res, next) => {
  const subscription = await Subscription.create(req.body);

  res.status(201).json({
    success: true,
    subscription,
  });
});
exports.getAllSubscriptionTournament = catchAsyncErrors(
  async (req, res, next) => {
    const subscription = await Subscription.find();

    res.status(201).json({
      success: true,
      subscription,
    });
  }
);
