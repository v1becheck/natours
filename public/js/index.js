/* eslint-disable */
// import '@babel/polyfill';
// import 'core-js/stable';
// import 'regenerator-runtime';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { displayMap } from './leaflet';

const map = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

// Get locations from HTML
if (map) {
  const locations = JSON.parse(map.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'User');
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
