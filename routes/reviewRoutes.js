const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// mergeParams allows to use route '/:tourId/reviews' from tourRoutes
const router = express.Router({ mergeParams: true });

// POST /tours/25j235hkg235h3/reviews
// GET /tours/25j235hkg235h3/reviews
// GET /tours/25j235hkg235h3/reviews/151g51g15i5g151k3

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setTouruserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    reviewController.updateReview
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    reviewController.deleteReview
  );

module.exports = router;
