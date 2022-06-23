const Blog = require('../models/blog');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');
// Admin Routes

// Register a blog   => /api/v1/register
exports.creatblog = catchAsyncErrors(async (req, res, next) => {
  
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
  }

  const { heading, description } = req.body;

  const blog = await Blog.create({
    heading,
    description,
    image,
  });
  res.status(201).json({
    success: true,
    blog,
  });
});
// Get single blog   =>   /api/v1/admin/faqs
exports.singleBlog = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.body.id);
  res.status(200).json({
    success: true,
    blog,
  });
});
// get all blogs
exports.allBlogs = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.find();

  res.status(200).json({
    success: true,
    blog,
  });
});
// Update blog Update   =>   /api/v1/me/update
exports.updateBlog = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(
      new ErrorHandler(`Blog does't exist with id: ${req.params.id}`)
    );
  }
  // Remove image from cloudinary
  const image_id = blog.image.public_id;
  await cloudinary.v2.uploader.destroy(image_id);
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
  }

  const newBlogData = {
    heading: req.body.heading,
    description: req.body.description,
    image,
  };
  const blog2 = await Blog.findByIdAndUpdate(req.params.id, newBlogData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    blog2,
  });
});

// Delete blog   =>   /api/v1/admin/blog/:id
exports.deleteBlog = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(
      new ErrorHandler(`Blog does't exist with id: ${req.params.id}`)
    );
  }
  // Remove image from cloudinary
  const image_id = blog.image.public_id;
  await cloudinary.v2.uploader.destroy(image_id);

  await blog.remove();

  res.status(200).json({
    success: true,
  });
});
exports.createBlogReview = catchAsyncErrors(async (req, res, next) => {
  const { name, email, comment, blogId } = req.body;

  const review = {
    name,
    email,
    comment,
  };

  const blog = await Blog.findById(blogId);

  blog.reviews.push(review);
  blog.numOfReviews = blog.reviews.length;

  await blog.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
