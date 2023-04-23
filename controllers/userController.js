const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

// Multer configuration for storage
// const multerStorage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'public/img/users');
//   },
//   filename: (req, file, callback) => {
//     // user-id-timestamp.jpeg
//     const extension = file.mimetype.split('/')[1];
//     callback(null, `user-${req.user.id}-${Date.now()}.${extension}`);
//   },
// });

// Saving image just to memory buffer so we can resize it afterwards, skipping the saving image to the disk
const multerStorage = multer.memoryStorage();

// Multer configuration for filtering
const multerFilter = (req, file, callback) => {
  // Filtering if file is an image
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(
      new AppError('File is not an image! Please upload only images!', 404),
      false
    );
  }
};

// Profile image uploads middleware definition
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// sharp middleware for resizing images before upload
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}.jpeg`;

  // Resize the image, format it, compress and save it to the disk
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

// Image middleware
exports.uploadUserPhoto = upload.single('photo');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// /me endpoint middleware
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user posts password data
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError('This page is not for password updates.', 400));

  // 2. Update user document
  const filteredBody = filterObj(req.body, 'name', 'email');
  // If user uploads a new image, update it in the database as well
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined! Please use use /signup instead',
  });
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User); //DO NOT update passwords with this!
exports.deleteUser = factory.deleteOne(User);
