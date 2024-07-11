import axios from 'axios';
import UserReq from '../../../http/users';
import { AppDispatch } from '../../store';
import { Role } from '../user/UserSlice';
import { findUsersSlice } from './findUsersSlice';

export const getAllUsersByEmail =
   (email: string) => async (dispatch: AppDispatch) => {
      try {
         dispatch(findUsersSlice.actions.start());
         const foundUsers = await UserReq.getUserByEmailAndRole(
            Role.USER,
            email,
         );
         dispatch(findUsersSlice.actions.getUsersSuccess(foundUsers));
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(findUsersSlice.actions.error(error.response?.data));
         } else
            dispatch(
               findUsersSlice.actions.error(
                  'Помилка при отриманні користувачів за адресою електронної пошти',
               ),
            );
      }
   };

export const deleteFoundUser = (id: number) => (dispatch: AppDispatch) => {
   dispatch(findUsersSlice.actions.deleteFindUserSuccess(id));
};
