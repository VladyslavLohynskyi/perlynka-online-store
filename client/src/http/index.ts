import axios, { AxiosRequestConfig } from 'axios';
import { baseURL } from '../utils/constants';

const $novaPostApi = axios.create({
   baseURL: 'https://api.novaposhta.ua/v2.0/json/',
});
const $host = axios.create({
   baseURL: baseURL + 'api/',
});

const $authHost = axios.create({
   baseURL: baseURL + 'api/',
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

export { $host, $authHost, $novaPostApi };
