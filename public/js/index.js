/* eslint-disable */
// import '@babel/polyfill';
// import 'core-js/stable';
// import 'regenerator-runtime';
import { login, logout } from './login';
import { updateData } from './updateSettings';
import { displayMap } from './leaflet';

const map = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');

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
    updateData(name, email);
  });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);
