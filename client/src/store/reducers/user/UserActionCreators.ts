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
   surname: string;
   name: string;
   password: string;
   phoneNumber: string;
}
interface IUpdateUserDataProps {
   name?: string;
   surname?: string;
}
export const registrationUser =
   ({ email, password, name, surname, phoneNumber }: ISignUpUserProps) =>
   async (dispatch: AppDispatch) => {
      try {
         dispatch(userSlice.actions.userRegistration());
         const data = await UserReq.registration(
            email,
            password,
            name,
            surname,
            phoneNumber,
         );
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
         dispatch(userSlice.actions.userLoginSuccess({ ...data }));
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
      dispatch(userSlice.actions.userAuthSuccess({ ...data }));
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

export const getFullInfoOfUser = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(userSlice.actions.userGetFullInfo());
      const data = await UserReq.getUserFullInfo();
      dispatch(userSlice.actions.userGetFullInfoSuccess(data.user));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(userSlice.actions.userGetFullInfoError(error.response?.data));
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

export const updateUserData =
   (userUpdateData: IUpdateUserDataProps) => async (dispatch: AppDispatch) => {
      try {
         dispatch(userSlice.actions.userUpdateData());
         const data = await UserReq.updateUserData({ ...userUpdateData });
         dispatch(userSlice.actions.userUpdateDataSuccess(data));
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(
               userSlice.actions.userUpdateDataError(error.response?.data),
            );
         } else
            dispatch(
               userSlice.actions.userUpdateDataError(
                  'Невідома помилка під час зміни данних користувача',
               ),
            );
      }
   };
