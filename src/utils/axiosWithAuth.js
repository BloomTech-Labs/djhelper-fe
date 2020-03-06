import axios from 'axios';

const BACKEND_HOST =
  process.env.REACT_APP_BACKEND_HOST ||
  'https://ec2-18-218-74-229.us-east-2.compute.amazonaws.com';

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
