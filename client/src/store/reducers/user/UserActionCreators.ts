import jwt_decode from 'jwt-decode';
import { AppDispatch } from '../../store';
import { IUser, userSlice } from './UserSlice';
import UserReq from '../../../http/users';

import axios from 'axios';
import { synchronizeBaskets } from '../basket/BasketActionCreators';
import { IAddShoes } from '../../../http/basket';

interface ILoginUserProps {
   email: string;
   password: string;
   shoes: IAddShoes[];
}

interface ISignUpUserProps {
   email: string;
   password: string;
}

export const registrationUser =
   ({ email, password }: ISignUpUserProps) =>
   async (dispatch: AppDispatch) => {
      try {
         dispatch(userSlice.actions.userRegistration());
         const data = await UserReq.registration(email, password);
         const user = jwt_decode<IUser>(data.token);
         dispatch(
            userSlice.actions.userRegistrationSuccess({
               user,
               token: data.token,
               message: data.message,
            }),
         );
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(
               userSlice.actions.userRegistrationError(error.response?.data),
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
   ({ email, password, shoes }: ILoginUserProps) =>
   async (dispatch: AppDispatch) => {
      try {
         dispatch(userSlice.actions.userLogin());
         const data = await UserReq.login(email, password);
         const user: IUser = jwt_decode(data.token);
         dispatch(
            userSlice.actions.userLoginSuccess({ user, token: data.token }),
         );
         dispatch(synchronizeBaskets(shoes));
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(userSlice.actions.userLoginError(error.response?.data));
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
         dispatch(userSlice.actions.userAuthError(error.response?.data));
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
      const { data } = await UserReq.logout();
      dispatch(userSlice.actions.userLogOut(data.message));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(userSlice.actions.userAuthError(error.response?.data));
      } else
         dispatch(
            userSlice.actions.userAuthError(
               'Невідома помилка під час виходу з аккаунту',
            ),
         );
   }
};
