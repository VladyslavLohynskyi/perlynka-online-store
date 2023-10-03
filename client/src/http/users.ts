import { $host, $authHost } from '.';

class UserReq {
   registration = async (email: string, password: string) => {
      const { data } = await $host.post<{ token: string }>(
         '/user/registration',
         {
            email,
            password,
         },
      );
      return data;
   };
   login = async (email: string, password: string) => {
      const { data } = await $host.post<{ token: string }>('/user/login', {
         email,
         password,
      });
      return data;
   };

   auth = async () => {
      const { data } = await $authHost.get<{ token: string }>('/user/auth');
      return data;
   };
}

export default new UserReq();
