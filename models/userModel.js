const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name.'],
    trim: true,
    maxLength: [40, 'A user name can not have more than 40 characters'],
    minLength: [5, 'A user name can not have less than 10 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide email in valid format.'],
    trim: true,
    maxLength: [40, 'Email can not have more than 40 characters'],
    minLength: [10, 'Email name can not have less than 10 characters'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minLength: [8, 'A user password can not have less than 10 characters'],
  },
  passwordConfirm: {
    type: String,
    // This only works on save and create
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
    required: [true, 'Please confirm your password.'],
    minLength: [8, 'A user password can not have less than 10 characters'],
  },
});

userSchema.pre('save', async function (next) {
  // Only run if password is modified
  if (!this.isModified('password')) return next();

  // Has the password with CPU cost of 12
  this.password = await bcrypt.hash(this.password, 16);
  // Dont persist confirm password to the DB
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
