import jwt_decode from 'jwt-decode';
import { AppDispatch } from '../../store';
import { IUser, userSlice } from './UserSlice';
import UserReq from '../../../http/users';

import axios, { AxiosError } from 'axios';

interface IAuthUserProps {
   email: string;
   password: string;
}

export const registrationUser =
   ({ email, password }: IAuthUserProps) =>
   async (dispatch: AppDispatch) => {
      try {
         dispatch(userSlice.actions.userRegistration());
         const data = await UserReq.registration(email, password);
         const user = jwt_decode<IUser>(data.token);
         dispatch(
            userSlice.actions.userRegistrationSuccess({
               user,
               token: data.token,
            }),
         );
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(
               userSlice.actions.userRegistrationError(
                  error.response?.data.message,
               ),
            );
         } else
            dispatch(
               userSlice.actions.userRegistrationError(
                  'Невідома помилка при реєстрації',
               ),
            );
      }
   };

export const loginUser =
   ({ email, password }: IAuthUserProps) =>
   async (dispatch: AppDispatch) => {
      try {
         dispatch(userSlice.actions.userLogin());
         const data = await UserReq.login(email, password);
         const user: IUser = jwt_decode(data.token);
         dispatch(
            userSlice.actions.userLoginSuccess({ user, token: data.token }),
         );
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(
               userSlice.actions.userLoginError(error.response?.data.message),
            );
         } else
            dispatch(
               userSlice.actions.userLoginError(
                  'Невідома помилка під час входу в обліковий запис',
               ),
            );
      }
   };

export const authUser = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(userSlice.actions.userAuth());
      const data = await UserReq.auth();
      const user: IUser = jwt_decode(data.token);
      dispatch(userSlice.actions.userAuthSuccess({ user, token: data.token }));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(
            userSlice.actions.userAuthError(error.response?.data.message),
         );
      } else
         dispatch(
            userSlice.actions.userAuthError(
               'Невідома помилка під час аунтефікації',
            ),
         );
   }
};

export const logOutUser = () => async (dispatch: AppDispatch) => {
   try {
      await UserReq.logout();
      dispatch(userSlice.actions.userLogOut());
   } catch (error) {
      console.log(error);
   }
};
