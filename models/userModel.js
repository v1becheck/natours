const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name.'],
    trim: true,
    maxLength: [40, 'A user name can not have more than 40 characters'],
    minLength: [10, 'A user name can not have less than 10 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide email in valid format.']
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
    required: [true, 'Please confirm your password.'],
    minLength: [8, 'A user password can not have less than 10 characters'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
