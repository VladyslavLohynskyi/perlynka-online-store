import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFilterState {
   selectedBrands: string[];
   isLoading: boolean;
   error: string;
}

const initialState: IFilterState = {
   selectedBrands: [],
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

      brandFilterSuccess(state, action: PayloadAction<string>) {
         state.isLoading = false;
         if (!state.selectedBrands.includes(action.payload)) {
            state.selectedBrands = [...state.selectedBrands, action.payload];
         } else {
            state.selectedBrands = state.selectedBrands.filter(
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
