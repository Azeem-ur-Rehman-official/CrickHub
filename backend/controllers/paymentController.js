const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'pkr',
    description: 'items purchase',
    shipping: {
      name: 'Azeem ue Rehman',
      address: {
        line1: 'JOHER TOWN P BLOCK',
        postal_code: '42000',
        city: 'LAHORE',
        state: 'PUNJAB',
        country: 'PAKISTAN',
      },
    },

    metadata: { integration_check: 'accept_a_payment' },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});
// Process stripe payments   =>   /api/v1/payment/process/v2
exports.processPaymentSubscription = catchAsyncErrors(
  async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'pkr',
      description: 'buy subscription',
      shipping: {
        name: 'Azeem ue Rehman',
        address: {
          line1: 'JOHER TOWN P BLOCK',
          postal_code: '42000',
          city: 'LAHORE',
          state: 'PUNJAB',
          country: 'PAKISTAN',
        },
      },

      metadata: { integration_check: 'accept_a_payment' },
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  }
);
// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
