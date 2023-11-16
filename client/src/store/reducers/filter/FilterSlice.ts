import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SexEnum } from '../shoes/ShoesSlice';

interface IFilterState {
   selectedBrandsId: number[];
   selectedTypesId: number[];
   selectedSeasonsId: number[];
   selectedColorsId: number[];
   selectedSex: SexEnum;
   isLoading: boolean;
   error: string;
}

const initialState: IFilterState = {
   selectedBrandsId: [],
   selectedTypesId: [],
   selectedSeasonsId: [],
   selectedColorsId: [],
   selectedSex: SexEnum.UNISEX,
   isLoading: true,
   error: '',
};

export const filterSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      brandFilterSuccess(state, action: PayloadAction<number>) {
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

      typeFilterSuccess(state, action: PayloadAction<number>) {
         if (!state.selectedTypesId.includes(action.payload)) {
            state.selectedTypesId = [...state.selectedTypesId, action.payload];
         } else {
            state.selectedTypesId = state.selectedTypesId.filter(
               (el) => el !== action.payload,
            );
         }
      },

      seasonFilterSuccess(state, action: PayloadAction<number>) {
         if (!state.selectedSeasonsId.includes(action.payload)) {
            state.selectedSeasonsId = [
               ...state.selectedSeasonsId,
               action.payload,
            ];
         } else {
            state.selectedSeasonsId = state.selectedSeasonsId.filter(
               (el) => el !== action.payload,
            );
         }
      },

      colorFilterSuccess(state, action: PayloadAction<number>) {
         if (!state.selectedColorsId.includes(action.payload)) {
            state.selectedColorsId = [
               ...state.selectedColorsId,
               action.payload,
            ];
         } else {
            state.selectedColorsId = state.selectedColorsId.filter(
               (el) => el !== action.payload,
            );
         }
      },

      sexFilterSuccess(state, action: PayloadAction<SexEnum>) {
         state.selectedSex = action.payload;
      },
   },
});

export default filterSlice.reducer;
