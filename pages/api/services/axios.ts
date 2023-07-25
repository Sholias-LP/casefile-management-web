import axios from 'axios';
import getConfig from 'next/config';
import { getDefaultAuth } from '../../../utils/storage';
import { setLogout } from '../../../context/user';
const { publicRuntimeConfig } = getConfig();

const Axios = axios.create({
  baseURL: publicRuntimeConfig.backendUrl,
});
Axios.interceptors.request.use(
  (config) => {
    const token = getDefaultAuth();
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      (error.response.status === 401 &&
        error.response.data.message === 'Access Denied') ||
      (error.response.status === 401 &&
        error.response.data.message === 'Unauthorized Exception') ||
      (error.response.status === 401 &&
        error.response.data.message === 'Unauthorized')
    ) {
      setLogout();
    }
    return Promise.reject(error);
  }
);

export default Axios;
