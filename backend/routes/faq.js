const express = require('express');
const router = express.Router();

const {
  creatfaq,
  allfaqs,
  faqUpdate,
  deletefaq,
  singlefaq,
} = require('../controllers/faqController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
router
  .route('/admin/faq/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), creatfaq);
router.route('/faq').get(allfaqs);
router.route('/single/faq').post(singlefaq);
router
  .route('/admin/faq/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), faqUpdate)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deletefaq);
module.exports = router;
