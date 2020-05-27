import axios from 'axios';

const BACKEND_HOST =
  process.env.REACT_APP_BACKEND_HOST || 'https://api.dj-helper.com/';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: `${BACKEND_HOST}/api`,
    headers: {
      Authorization: token
    }
  });
};

export default axiosWithAuth;
