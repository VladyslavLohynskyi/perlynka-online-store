import axios from 'axios';
import { $host, $authHost } from '.';
import { IUser, Role } from '../store/reducers/user/UserSlice';
import { baseURL } from '../utils/constants';
import { IBasicResponse } from './basket';

export interface IUserResponse {
   user: IUser;
   message: string;
}

interface IUpdateUserData {
   name?: string;
   surname?: string;
}

export class UserReq {
   registration = async (
      email: string,
      password: string,
      name: string,
      surname: string,
      phoneNumber: string,
   ) => {
      const { data } = await $host.post<{ token: string; message: string }>(
         '/user/registration',
         {
            email,
            password,
            name,
            surname,
            phoneNumber,
         },
      );
      return data;
   };
   login = async (email: string, password: string) => {
      const { data } = await $host.post<{ token: string; user: IUser }>(
         '/user/login',
         {
            email,
            password,
         },
      );
      return data;
   };

   auth = async () => {
      const { data } = await axios.get<{ token: string; user: IUser }>(
         `${baseURL}api/user/refresh`,
         { withCredentials: true },
      );
      return data;
   };

   getUsersByRole = async (role: Role) => {
      const { data } = await $authHost.get<IUser[]>('/user/users', {
         params: { role },
      });
      return data;
   };
   getUserByEmailAndRole = async (role: Role, email: string) => {
      const { data } = await $authHost.get<IUser[]>('/user/', {
         params: { role, email },
      });
      return data;
   };
   deleteAdmin = async (id: number) => {
      const { data } = await $authHost.put<IUserResponse>('/user/role', {
         id,
         role: Role.USER,
      });
      return data;
   };

   addAdmin = async (id: number) => {
      const { data } = await $authHost.put<IUserResponse>('/user/role', {
         id,
         role: Role.ADMIN,
      });
      return data;
   };

   logout = async () => {
      return $authHost.get<IBasicResponse>('/user/logout');
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
   getUserFullInfo = async () => {
      const { data } = await $authHost.get<IUserResponse>('/user/user-info');
      return data;
   };

   updateUserData = async (updateUserData: IUpdateUserData) => {
      const { data } = await $authHost.patch<IUserResponse>('/user', {
         ...updateUserData,
      });
      return data;
   };
}

export default new UserReq();
