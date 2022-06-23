const express = require('express');
const router = express.Router();

const {
  creatblog,
  allBlogs,
  updateBlog,
  deleteBlog,
  createBlogReview,
  singleBlog,
} = require('../controllers/blogController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
router
  .route('/admin/blog/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), creatblog);
router.route('/single/blog').post(singleBlog);
router.route('/blog/review').post(createBlogReview);
router.route('/blogs').get(allBlogs);
router
  .route('/admin/blog/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateBlog)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBlog);
module.exports = router;
