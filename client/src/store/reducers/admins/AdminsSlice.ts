import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserRes } from '../../../http/users';
import { Role } from '../user/UserSlice';

interface IUserState {
   admins: IUserRes[];
   isLoading: boolean;
   error: string;
}

const initialState: IUserState = {
   admins: [],
   isLoading: true,
   error: '',
};

export const adminsSlice = createSlice({
   name: 'admins',
   initialState,
   reducers: {
      start(state) {
         state.isLoading = true;
         state.error = '';
      },
      getAdminsSuccess(state, action: PayloadAction<IUserRes[]>) {
         state.isLoading = false;
         state.error = '';
         state.admins = [...action.payload];
      },

      deleteAdminSuccess(state, action: PayloadAction<IUserRes>) {
         state.isLoading = false;
         state.error = '';
         state.admins = state.admins.filter(
            (admin) => admin.id !== action.payload.id,
         );
      },
      addAdminSuccess(state, action: PayloadAction<IUserRes>) {
         state.isLoading = false;
         state.error = '';
         state.admins = [
            ...state.admins,
            { ...action.payload, role: Role.ADMIN },
         ];
      },

      error(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      },
   },
});

export default adminsSlice.reducer;
