import { showAlert } from './alerts';

export const updateData = async (name, email) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMe',
      data: {
        name,
        email,
      },
    });

    // Reload to settings page after 1.3 sec
    if (res.data.status === 'success') {
      showAlert('success', 'User updated successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
