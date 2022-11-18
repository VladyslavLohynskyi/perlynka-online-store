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
         document.cookie = `token=${action.payload.token}`;
      },
      userRegistrationError(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      },

      userLogin(state) {
         state.isLoading = true;
      },
      userLoginSuccess(state, action: PayloadAction<IAuthUser>) {
         state.isLoading = false;
         state.user = action.payload.user;
         state.isAuth = true;
         document.cookie = `token=${action.payload.token}`;
      },
      userLoginError(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      },

      userAuth(state) {
         state.isLoading = true;
      },
      userAuthSuccess(state, action: PayloadAction<IAuthUser>) {
         state.error = '';
         state.user = action.payload.user;
         state.isAuth = true;
         document.cookie = `token=${action.payload.token}`;
      },
      userAuthError(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.user = null;
         state.isAuth = false;
         state.error = action.payload;
      },

      userLogOut(state) {
         state.user = null;
         state.isAuth = false;
         document.cookie = 'token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
      },
   },
});

export default userSlice.reducer;
