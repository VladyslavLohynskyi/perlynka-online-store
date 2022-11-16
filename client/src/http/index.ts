import axios, { AxiosRequestConfig } from 'axios';
import { baseURL } from '../utils/constants';

const $host = axios.create({
   baseURL,
});

const $authHost = axios.create({
   baseURL,
});

const authInterceptor = (config: AxiosRequestConfig) => {
   const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

   config.headers!.authorization = `Bearer ${cookieValue}`;

   return config;
};

$authHost.interceptors.request.use(authInterceptor);

export const getRoot = async () => {
   const { data } = await $host.get('/');
   return data;
};

export { $host, $authHost };
