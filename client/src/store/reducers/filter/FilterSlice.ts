import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SexEnum } from '../shoes/ShoesSlice';

export enum SortEnum {
   PRICE_ASC = 'price ASC',
   PRICE_DESC = 'price DESC',
   CREATED_AT_ASC = 'createdAt ASC',
   CREATED_AT_DESC = 'createdAt DESC',
}
interface IFilterState {
   selectedBrandsId: number[];
   selectedTypesId: number[];
   selectedSeasonsId: number[];
   selectedColorsId: number[];
   selectedSex: SexEnum;
   selectedSizesId: number[];
   selectedSortFilter: SortEnum;
   page: number;
   limit: number;
   isLoading: boolean;
   error: string;
}

const initialState: IFilterState = {
   selectedBrandsId: [],
   selectedTypesId: [],
   selectedSeasonsId: [],
   selectedColorsId: [],
   selectedSizesId: [],
   selectedSortFilter: SortEnum.PRICE_ASC,
   selectedSex: SexEnum.UNISEX,
   page: 1,
   limit: 1,
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

      sizesFilterSuccess(state, action: PayloadAction<number>) {
         if (!state.selectedSizesId.includes(action.payload)) {
            state.selectedSizesId = [...state.selectedSizesId, action.payload];
         } else {
            state.selectedSizesId = state.selectedSizesId.filter(
               (el) => el !== action.payload,
            );
         }
      },

      sexFilterSuccess(state, action: PayloadAction<SexEnum>) {
         state.selectedSex = action.payload;
      },

      sortFilterSuccess(state, action: PayloadAction<SortEnum>) {
         state.selectedSortFilter = action.payload;
      },
      changePage(state, action: PayloadAction<number>) {
         state.page = action.payload;
      },
      resetFiltersSuccess(state) {
         state.selectedBrandsId = [];
         state.selectedColorsId = [];
         state.selectedSeasonsId = [];
         state.selectedSizesId = [];
         state.selectedTypesId = [];
         state.selectedSex = SexEnum.UNISEX;
         state.selectedSortFilter = SortEnum.PRICE_ASC;
      },
   },
});

export default filterSlice.reducer;
