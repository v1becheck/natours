const Review = require('../models/reviewModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  //EXECUTE QUERY
  const features = new APIFeatures(Review.find(), req.query).sort().paginate();

  const reviews = await features.query;

  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  console.log('tourid: ' + JSON.stringify(req.params, null, 4));
  if (!req.body.user) req.body.user = req.user;
  console.log('userid: ' + req.user._id);

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
