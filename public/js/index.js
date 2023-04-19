/* eslint-disable */
// import '@babel/polyfill';
// import 'core-js/stable';
// import 'regenerator-runtime';
import { login } from './login';
import { displayMap } from './leaflet';

const map = document.getElementById('map');
const loginForm = document.querySelector('.form');

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
