import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
   isAuth: boolean;
   user: IUser | null;
   isLoading: boolean;
   error: string;
   message: string;
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
   isLoading: true,
   error: '',
   message: '',
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      userRegistration(state) {
         state.isLoading = true;
         state.error = '';
         state.message = '';
      },
      userRegistrationSuccess(
         state,
         action: PayloadAction<{ token: string; message: string; user: IUser }>,
      ) {
         state.isLoading = false;
         state.error = '';
         state.user = action.payload.user;
         document.cookie = `token=${action.payload.token}`;
         state.message = action.payload.message;
      },
      userRegistrationError(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      },

      userLogin(state) {
         state.isLoading = true;
         state.error = '';
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
         state.error = '';
      },
      userAuthSuccess(state, action: PayloadAction<IAuthUser>) {
         state.error = '';
         state.user = action.payload.user;
         state.isAuth = true;
         document.cookie = `token=${action.payload.token}`;
         state.isLoading = false;
      },
      userAuthError(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.user = null;
         state.isAuth = false;
      },

      userClearError(state) {
         state.error = '';
      },

      userLogOut(state, action: PayloadAction<string>) {
         state.user = null;
         state.isAuth = false;
         document.cookie = 'token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
         state.message = action.payload;
      },
   },
});

export default userSlice.reducer;
