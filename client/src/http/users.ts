import { $host, $authHost } from '.';
import { Role } from '../store/reducers/user/UserSlice';
export interface IUserRes {
   id: string;
   email: string;
   role: Role;
}
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

   getUsersByRole = async (role: Role) => {
      const { data } = await $authHost.get<IUserRes[]>('/user/users', {
         params: { role },
      });
      return data;
   };
   getUserByEmailAndRole = async (role: Role, email: string) => {
      const { data } = await $authHost.get<IUserRes[]>('/user/', {
         params: { role, email },
      });
      return data;
   };
   deleteAdmin = async (id: string) => {
      const { data } = await $authHost.put<IUserRes>('/user/role', {
         id,
         role: Role.USER,
      });
      return data;
   };

   addAdmin = async (id: string) => {
      const { data } = await $authHost.put<IUserRes>('/user/role', {
         id,
         role: Role.ADMIN,
      });
      return data;
   };
}

export default new UserReq();
