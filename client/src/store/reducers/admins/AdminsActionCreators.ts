import axios from 'axios';
import UserReq from '../../../http/users';
import { AppDispatch } from '../../store';

import { Role } from '../user/UserSlice';
import { adminsSlice } from './AdminsSlice';

export const getAllAdmins = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(adminsSlice.actions.start());
      const admins = await UserReq.getUsersByRole(Role.ADMIN);
      dispatch(adminsSlice.actions.getAdminsSuccess(admins));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(adminsSlice.actions.error(error.response?.data));
      } else
         dispatch(
            adminsSlice.actions.error('Помилка при отриманні списку адмінів'),
         );
   }
};

export const deleteAdmin = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(adminsSlice.actions.start());
      const admin = await UserReq.deleteAdmin(id);
      dispatch(adminsSlice.actions.deleteAdminSuccess(admin));
      return admin;
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(adminsSlice.actions.error(error.response?.data));
      } else
         dispatch(adminsSlice.actions.error('Помилка при видаленні адміна'));
   }
};

export const addAdmin = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(adminsSlice.actions.start());
      const admin = await UserReq.addAdmin(id);
      dispatch(adminsSlice.actions.addAdminSuccess(admin));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(adminsSlice.actions.error(error.response?.data));
      } else
         dispatch(adminsSlice.actions.error('Помилка при додаванні адміна'));
   }
};
