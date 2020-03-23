import axios from 'axios';

const BACKEND_HOST = "https://api.dj-helper.com/";
console.log(BACKEND_HOST);

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
