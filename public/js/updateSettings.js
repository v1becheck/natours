import { showAlert } from './alerts';

// type is either 'Password' or 'User' depending on the form that is submitted
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'Password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url: url,
      data,
    });

    // Reload to home page after 1.3 sec
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/me');
      }, 1300);
    }
    if (res.data.status === 'success') {
      showAlert('success', `${type} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
