import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
   isAuth: boolean;
   user: IUser | null;
   isLoading: boolean;
   error: string;
}

export interface IAuthUser {
   token: string;
   user: IUser;
}
export enum Role {
   ADMIN = 'ADMIN',
   USER = 'USER',
}

export interface IUser {
   id: number;
   email: string;
   role: Role;
}

const initialState: IUserState = {
   isAuth: false,
   user: null,
   isLoading: false,
   error: '',
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      userRegistration(state) {
         state.isLoading = true;
      },
      userRegistrationSuccess(state, action: PayloadAction<IAuthUser>) {
         state.isLoading = false;
         state.error = '';
         state.user = action.payload.user;
         state.isAuth = true;
         localStorage.setItem('token', action.payload.token);
      },
      userRegistrationError(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      },
   },
});

export default userSlice.reducer;
