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
         dispatch(findUsersSlice.actions.error('Getting List OF Users Error'));
      }
   };

export const deleteFoundUser = (id: string) => (dispatch: AppDispatch) => {
   dispatch(findUsersSlice.actions.deleteFindUserSuccess(id));
};
