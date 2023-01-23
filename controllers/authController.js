const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign({ id: newUser._id }, `${process.env_JWT_SECRET}`, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  console.log(token);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});
