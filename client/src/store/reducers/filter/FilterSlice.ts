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
   limit: 6,
   isLoading: true,
   error: '',
};
export function getCookieValue(name: string) {
   const regex = new RegExp(`(^| )${name}=([^;]+)`);
   const match = document.cookie.match(regex);
   if (match) {
      return match[2];
   }
}
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
         document.cookie = `brandFilter=${state.selectedBrandsId}; path=/;`;
         state.page = 1;
         document.cookie = `page=${state.page}; path=/;`;
      },

      typeFilterSuccess(state, action: PayloadAction<number>) {
         if (!state.selectedTypesId.includes(action.payload)) {
            state.selectedTypesId = [...state.selectedTypesId, action.payload];
         } else {
            state.selectedTypesId = state.selectedTypesId.filter(
               (el) => el !== action.payload,
            );
         }
         document.cookie = `typeFilter=${state.selectedTypesId}; path=/;`;
         state.page = 1;
         document.cookie = `page=${state.page}; path=/;`;
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
         document.cookie = `seasonFilter=${state.selectedSeasonsId}; path=/;`;
         state.page = 1;
         document.cookie = `page=${state.page}; path=/;`;
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
         document.cookie = `colorFilter=${state.selectedColorsId}; path=/;`;
         state.page = 1;
         document.cookie = `page=${state.page}; path=/;`;
      },

      sizesFilterSuccess(state, action: PayloadAction<number>) {
         if (!state.selectedSizesId.includes(action.payload)) {
            state.selectedSizesId = [...state.selectedSizesId, action.payload];
         } else {
            state.selectedSizesId = state.selectedSizesId.filter(
               (el) => el !== action.payload,
            );
         }
         document.cookie = `sizeFilter=${state.selectedSizesId}; path=/;`;
         state.page = 1;
         document.cookie = `page=${state.page}; path=/;`;
      },

      sexFilterSuccess(state, action: PayloadAction<SexEnum>) {
         state.selectedSex = action.payload;
         document.cookie = `sexFilter=${state.selectedSex}; path=/;`;
         state.page = 1;
         document.cookie = `page=${state.page}; path=/;`;
      },

      sortFilterSuccess(state, action: PayloadAction<SortEnum>) {
         state.selectedSortFilter = action.payload;
         document.cookie = `sortFilter=${state.selectedSortFilter}; path=/;`;
         state.page = 1;
         document.cookie = `page=${state.page}; path=/;`;
      },
      changePage(state, action: PayloadAction<number>) {
         state.page = action.payload;
         document.cookie = `page=${state.page}; path=/;`;
      },
      resetFiltersSuccess(state) {
         state.selectedBrandsId = [];
         document.cookie =
            'brandFilter= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
         state.selectedColorsId = [];
         document.cookie =
            'colorFilter= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
         state.selectedSeasonsId = [];
         document.cookie =
            'seasonFilter= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
         state.selectedSizesId = [];
         document.cookie =
            'sizeFilter= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
         state.selectedTypesId = [];
         document.cookie =
            'typeFilter= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
         state.selectedSex = SexEnum.UNISEX;
         document.cookie =
            'sexFilter= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
         state.selectedSortFilter = SortEnum.PRICE_ASC;
         document.cookie =
            'sortFilter= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
         state.page = 1;
         document.cookie = `page=${state.page}`;
      },

      preloadFilter(state) {
         state.selectedBrandsId =
            getCookieValue('brandFilter')
               ?.split(',')
               .map((el) => Number(el)) || [];

         state.selectedColorsId =
            getCookieValue('colorFilter')
               ?.split(',')
               .map((el) => Number(el)) || [];

         state.selectedSeasonsId =
            getCookieValue('seasonFilter')
               ?.split(',')
               .map((el) => Number(el)) || [];

         state.selectedTypesId =
            getCookieValue('typeFilter')
               ?.split(',')
               .map((el) => Number(el)) || [];
         state.selectedSizesId =
            getCookieValue('sizeFilter')
               ?.split(',')
               .map((el) => Number(el)) || [];

         state.selectedSex =
            (getCookieValue('sexFilter') as SexEnum) || SexEnum.UNISEX;
         state.selectedSortFilter =
            (getCookieValue('sortFilter') as SortEnum) || SortEnum.PRICE_ASC;
         state.page = Number(getCookieValue('page')) || 1;
      },
   },
});

export default filterSlice.reducer;
