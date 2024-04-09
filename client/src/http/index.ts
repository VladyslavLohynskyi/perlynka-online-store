import axios, { AxiosRequestConfig } from 'axios';
import { baseURL } from '../utils/constants';

const $novaPostApi = axios.create({
   baseURL: 'https://api.novaposhta.ua/v2.0/json/',
});
const $host = axios.create({
   withCredentials: true,
   baseURL: baseURL + 'api/',
});

const $authHost = axios.create({
   withCredentials: true,
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

$authHost.interceptors.response.use(
   (config) => {
      return config;
   },
   async (error) => {
      const originalRequest = error.config;
      if (
         error.response.status === 401 &&
         error.config &&
         !error.config._isRetry
      ) {
         originalRequest._isRetry = true;
      }
      if (error.response.status === 401) {
         try {
            const { data } = await axios.get<{ token: string }>(
               `${baseURL}api/user/refresh`,
               { withCredentials: true },
            );

            document.cookie = `token=${data.token}`;
            return $authHost.request(originalRequest);
         } catch (error) {
            document.cookie =
               'token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
            window.location.reload();
         }
      }
   },
);

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost, $novaPostApi };
