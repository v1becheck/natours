const showAlertReset = (type, msg) => {
  const markup = `<div id="alert-remove" class="alert alert--${type}">${msg}</div>`;

  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  const hideAlert = () => {
    const el = document.getElementById('alert-remove');
    el.remove();
  };
  //look at css file for more info
  // inside of the body, but right at the beginning => afterbegin
  window.setTimeout(hideAlert, 3000);
};

const passwordReset = async (password, passwordConfirm) => {
  try {
    //http request
    const res = await axios({
      method: 'PATCH',
      url: `/resetPassword/${window.location.pathname.split('/')[2]}`,
      data: {
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlertReset(
        'success',
        'Check your email for a link to reset your password'
      );
      window.setTimeout(() => {
        location.assign('/');
      }, 3000);
    }
  } catch (err) {
    console.log(err.response);
    showAlertReset('error', 'Error resetting ... Try again...');
  }
};

const passwordResetForm = document.getElementById('passwordResetForm');

if (passwordResetForm) {
  passwordResetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    console.log(password, passwordConfirm);

    passwordReset(password, passwordConfirm);
  });
}
