import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../user/UserSlice';

interface IUserState {
   foundUsers: IUser[];
   isLoading: boolean;
   error: string;
}

const initialState: IUserState = {
   foundUsers: [],
   isLoading: true,
   error: '',
};

export const findUsersSlice = createSlice({
   name: 'findUsers',
   initialState,
   reducers: {
      start(state) {
         state.isLoading = true;
         state.error = '';
      },
      getUsersSuccess(state, action: PayloadAction<IUser[]>) {
         state.isLoading = false;
         state.error = '';
         state.foundUsers = [...action.payload];
      },
      deleteFindUserSuccess(state, action: PayloadAction<number>) {
         state.isLoading = false;
         state.error = '';
         state.foundUsers = state.foundUsers.filter(
            (user) => user.id !== action.payload,
         );
      },
      error(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      },
   },
});

export default findUsersSlice.reducer;
