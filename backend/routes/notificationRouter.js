const router = require('express').Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const {
  sendNotification,
  notificationStatus,
  getNotification,
} = require('../controllers/notificationController');
router.post(
  '/user/notification',
  isAuthenticatedUser,

  getNotification
);
router.post(
  '/admin/send/notification',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  sendNotification
);
router.put(
  '/notification/status/:id',
  isAuthenticatedUser,

  notificationStatus
);
module.exports = router;
