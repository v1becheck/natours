/* eslint-disable */
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51N0LKOLFa6Z1ESGWmRuYHbTZv3evaFCTb3HnatVEyyGwErPbrItcHKbVWb93fOVbmH9Ne673s8C3ErGywA9sDb6N00yiHKsNz2'
  );

  try {
    // 1. Get checkout session from the API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
