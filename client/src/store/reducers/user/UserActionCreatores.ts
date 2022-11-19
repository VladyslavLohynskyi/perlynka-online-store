import { $host, $authHost } from '../../../http';
import jwt_decode from 'jwt-decode';
import { AppDispatch } from '../../store';
import { IUser, userSlice } from './UserSlice';

interface IAuthUserProps {
   email: string;
   password: string;
}

export const registrationUser =
   ({ email, password }: IAuthUserProps) =>
   async (dispatch: AppDispatch) => {
      try {
         dispatch(userSlice.actions.userRegistration());
         const { data } = await $host.post<{ token: string }>(
            '/user/registration',
            {
               email,
               password,
            },
         );
         const user = jwt_decode<IUser>(data.token);
         dispatch(
            userSlice.actions.userRegistrationSuccess({
               user,
               token: data.token,
            }),
         );
      } catch (error) {
         dispatch(
            userSlice.actions.userRegistrationError('registration Error'),
         );
      }
   };

export const loginUser =
   ({ email, password }: IAuthUserProps) =>
   async (dispatch: AppDispatch) => {
      try {
         dispatch(userSlice.actions.userLogin());
         const { data } = await $host.post<{ token: string }>('/user/login', {
            email,
            password,
         });
         const user: IUser = jwt_decode(data.token);
         dispatch(
            userSlice.actions.userLoginSuccess({ user, token: data.token }),
         );
      } catch (error) {
         dispatch(userSlice.actions.userLoginError('login Error'));
      }
   };

export const authUser = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(userSlice.actions.userAuth());
      const { data } = await $authHost.get<{ token: string }>('/user/auth');
      const user: IUser = jwt_decode(data.token);
      dispatch(userSlice.actions.userAuthSuccess({ user, token: data.token }));
   } catch (error) {
      dispatch(userSlice.actions.userAuthError('auth Error'));
   }
};

export const logOutUser = () => (dispatch: AppDispatch) => {
   dispatch(userSlice.actions.userLogOut());
};
