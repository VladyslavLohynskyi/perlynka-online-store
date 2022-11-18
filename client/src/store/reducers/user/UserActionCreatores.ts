import { $host } from '../../../http';

import { AppDispatch } from '../../store';
import { userSlice } from './UserSlice';

interface IRegistrationUserProps {
   email: string;
   password: string;
}

export const registrationUser =
   ({ email, password }: IRegistrationUserProps) =>
   async (dispatch: AppDispatch) => {
      try {
         dispatch(userSlice.actions.userRegistration());
         const { data } = await $host.post('/registration', {
            email,
            password,
         });
         dispatch(userSlice.actions.userRegistrationSuccess(data));
      } catch (error) {
         dispatch(
            userSlice.actions.userRegistrationError('registration Error'),
         );
      }
   };
