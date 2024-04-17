import axios from 'axios';
import { $host, $authHost } from '.';
import { Role } from '../store/reducers/user/UserSlice';
import { baseURL } from '../utils/constants';
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
      const { data } = await axios.get<{ token: string }>(
         `${baseURL}api/user/refresh`,
         { withCredentials: true },
      );
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

   logout = async () => {
      return $authHost.get('/user/logout');
   };

   sendForgotPasswordLink(email: string) {
      return $host.post('/user/forgot-password', { email });
   }
   checkForgotToken(id: string, token: string) {
      return $host.get('/user/forgot-password/check/' + id + '/' + token);
   }
   forgotPasswordChange(userId: string, password: string, token: string) {
      return $host.post('/user/forgot-password/change', {
         userId,
         password,
         token,
      });
   }
}

export default new UserReq();
