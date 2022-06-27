const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  console.log('payment');
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'pkr',
    description: 'Pusrchase crickhub products',
    shipping: {
      name: req.body.name,
      address: {
        line1: req.body.shippingInfo.address,
        postal_code: req.body.shippingInfo.postalCode,
        city: req.body.shippingInfo.city,

        country: req.body.shippingInfo.country,
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
      description: 'Pusrchase crickhub Tournament Subscription',
      shipping: {
        name: req.body.name,
        address: {
          line1: req.body.address,
          postal_code: req.body.postalCode,
          city: req.body.city,

          country: req.body.country,
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
