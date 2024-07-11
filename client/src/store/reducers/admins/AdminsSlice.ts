import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, Role } from '../user/UserSlice';
import { IUserResponse } from '../../../http/users';

interface IAdminState {
   admins: IUser[];
   isLoading: boolean;
   error: string;
   message: string;
}

const initialState: IAdminState = {
   admins: [],
   isLoading: true,
   error: '',
   message: '',
};

export const adminsSlice = createSlice({
   name: 'admins',
   initialState,
   reducers: {
      start(state) {
         state.isLoading = true;
         state.error = '';
         state.message = '';
      },
      getAdminsSuccess(state, action: PayloadAction<IUser[]>) {
         state.isLoading = false;
         state.error = '';
         state.admins = [...action.payload];
      },

      deleteAdminSuccess(state, action: PayloadAction<IUserResponse>) {
         state.isLoading = false;
         state.error = '';
         state.admins = state.admins.filter(
            (admin) => admin.id !== action.payload.user.id,
         );
         state.message = action.payload.message;
      },
      addAdminSuccess(state, action: PayloadAction<IUserResponse>) {
         state.isLoading = false;
         state.error = '';
         state.admins = [
            ...state.admins,
            { ...action.payload.user, role: Role.ADMIN },
         ];
         state.message = action.payload.message;
      },

      error(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
         state.message = '';
      },
   },
});

export default adminsSlice.reducer;
