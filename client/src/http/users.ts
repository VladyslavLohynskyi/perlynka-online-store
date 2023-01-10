import { $host, $authHost } from '.';

export const registration = async (email: string, password: string) => {
   const { data } = await $host.post<{ token: string }>('/user/registration', {
      email,
      password,
   });
   return data;
};

export const login = async (email: string, password: string) => {
   const { data } = await $host.post<{ token: string }>('/user/login', {
      email,
      password,
   });
   return data;
};

export const auth = async () => {
   const { data } = await $authHost.get<{ token: string }>('/user/auth');
   return data;
};
