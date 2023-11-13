import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFilterState {
   selectedBrandsId: number[];
   isLoading: boolean;
   error: string;
}

const initialState: IFilterState = {
   selectedBrandsId: [],
   isLoading: true,
   error: '',
};

export const filterSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      start(state) {
         state.isLoading = true;
         state.error = '';
      },

      brandFilterSuccess(state, action: PayloadAction<number>) {
         state.isLoading = false;
         if (!state.selectedBrandsId.includes(action.payload)) {
            state.selectedBrandsId = [
               ...state.selectedBrandsId,
               action.payload,
            ];
         } else {
            state.selectedBrandsId = state.selectedBrandsId.filter(
               (el) => el !== action.payload,
            );
         }
      },

      error(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      },
   },
});

export default filterSlice.reducer;
