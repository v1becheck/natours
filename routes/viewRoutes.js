const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.use(viewsController.alerts);

router.get(
  '/',
  // bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview
);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get(
  '/forgotPassword',
  authController.isLoggedIn,
  viewsController.getForgotPasswordForm
);

router.get('/resetPassword/:token', viewsController.getResetPasswordForm);
router.patch('/resetPassword/:token', authController.resetPassword);
router.get('/signup', authController.isLoggedIn, viewsController.getSignupForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);

// UPDATE USER DATA WITHOUT API
router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
