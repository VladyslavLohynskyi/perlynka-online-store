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
      dispatch(adminsSlice.actions.error('Getting List OF Admins Error'));
   }
};

export const deleteAdmin = (id: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(adminsSlice.actions.start());
      const admin = await UserReq.deleteAdmin(id);
      dispatch(adminsSlice.actions.deleteAdminSuccess(admin));
      return admin;
   } catch (error) {
      dispatch(adminsSlice.actions.error('Deleting Admin Error'));
   }
};

export const addAdmin = (id: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(adminsSlice.actions.start());
      const admin = await UserReq.addAdmin(id);
      dispatch(adminsSlice.actions.addAdminSuccess(admin));
   } catch (error) {
      dispatch(adminsSlice.actions.error('Deleting Admin Error'));
   }
};
