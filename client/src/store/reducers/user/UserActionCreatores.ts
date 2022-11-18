import { $host, $authHost } from '../../../http';
import jwt_decode, { JwtPayload } from 'jwt-decode';
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
         const { data } = await $host.post<string>('/registration', {
            email,
            password,
         });
         const user = jwt_decode<IUser>(data);
         dispatch(
            userSlice.actions.userRegistrationSuccess({ user, token: data }),
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
         const { data } = await $host.post<string>('/login', {
            email,
            password,
         });
         const user: IUser = jwt_decode(data);
         dispatch(userSlice.actions.userLoginSuccess({ user, token: data }));
      } catch (error) {
         dispatch(userSlice.actions.userLoginError('login Error'));
      }
   };

export const authUser = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(userSlice.actions.userAuth());
      const { data } = await $authHost.get<string>('/auth');
      const user: IUser = jwt_decode(data);
      dispatch(userSlice.actions.userAuthSuccess({ user, token: data }));
   } catch (error) {
      dispatch(userSlice.actions.userAuthError('auth Error'));
   }
};

export const logOutUser = () => (dispatch: AppDispatch) => {
   dispatch(userSlice.actions.userLogOut());
};
