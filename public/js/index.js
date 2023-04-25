/* eslint-disable */
// import '@babel/polyfill';
// import 'core-js/stable';
// import 'regenerator-runtime';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { displayMap } from './leaflet';
import { bookTour } from './stripe';
import { showAlert } from './alerts';

const map = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');

// Get locations from HTML
if (map) {
  const locations = JSON.parse(map.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--login').textContent = 'Logging in...';
    document.querySelector('.btn--login').style['opacity'] = 0.6;
    document.querySelector('.btn--login').style['cursor'] = 'auto';
    document.querySelector('.btn--login').disabled = true;

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await login(email, password);

    document.querySelector('.btn--login').textContent = 'Log In';
    document.querySelector('.btn--login').style['opacity'] = 1;
    document.querySelector('.btn--login').style['cursor'] = 'pointer';
    document.querySelector('.btn--login').disabled = false;
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'User');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    document.querySelector('.btn--save-password').style['opacity'] = 0.6;
    document.querySelector('.btn--save-password').style['cursor'] = 'auto';
    document.querySelector('.btn--save-password').disabled = true;

    const currentPassword = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { currentPassword, password, passwordConfirm },
      'Password'
    );

    // Clear fields after password update
    document.querySelector('.btn--save-password').textContent = 'Save Password';
    document.querySelector('.btn--save-password').style['opacity'] = 1;
    document.querySelector('.btn--save-password').style['cursor'] = 'pointer';
    document.querySelector('.btn--save-password').disabled = false;
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const tourId = e.target.dataset.tourId;
    bookTour(tourId);
  });

const alertMessage = docuemnt.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
