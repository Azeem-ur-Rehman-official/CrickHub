const express = require('express');
const router = express.Router();

const {
  processPayment,
  processPaymentSubscription,
  sendStripApi,
} = require('../controllers/paymentController');

const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router
  .route('/payment/process/v')
  .post(isAuthenticatedUser, processPaymentSubscription);
router.route('/stripeapi').get(isAuthenticatedUser, sendStripApi);

module.exports = router;
