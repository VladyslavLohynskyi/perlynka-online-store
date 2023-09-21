import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IBasicCategory {
   id: string;
   name: string;
}

export interface ISizeCategory {
   id: string;
   size: string;
}
export interface ISize {
   count: number;
   shoId: number;
   sizeId: number;
}
export interface IShoes {
   id?: number;
   model: string;
   price: number;
   rating: number;
   img: string;
   typeId: number;
   colorId: number;
   seasonId: number;
   brandId: number;
   sizes: ISize[];
}
export interface IShoesState {
   types: IBasicCategory[] | null;
   brands: IBasicCategory[] | null;
   colors: IBasicCategory[] | null;
   seasons: IBasicCategory[] | null;
   sizes: ISizeCategory[] | null;
   shoes: IShoes[];
   isLoading: boolean;
   error: string;
}

interface IPreloadList {
   types: IBasicCategory[];
   brands: IBasicCategory[];
   colors: IBasicCategory[];
   seasons: IBasicCategory[];
   shoes: IShoes[];
   sizes: ISizeCategory[];
}

const initialState: IShoesState = {
   types: null,
   brands: null,
   seasons: null,
   colors: null,
   shoes: [],
   sizes: null,
   isLoading: true,
   error: '',
};

export const shoesSlice = createSlice({
   name: 'shoes',
   initialState,
   reducers: {
      shoesPreloadList(state) {
         state.isLoading = true;
         state.error = '';
      },
      shoesPreloadListSuccess(state, action: PayloadAction<IPreloadList>) {
         state.isLoading = false;
         state.error = '';
         state.shoes = action.payload.shoes;
         state.types = action.payload.types;
         state.seasons = action.payload.seasons;
         state.colors = action.payload.colors;
         state.brands = action.payload.brands;
         state.sizes = action.payload.sizes;
      },
      shoesPreloadListError(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      },
      shoesCreate(state) {
         state.isLoading = true;
         state.error = '';
      },
      shoesCreateSuccess(state, action: PayloadAction<IShoes[]>) {
         state.isLoading = false;
         state.error = '';
         state.shoes = action.payload;
      },

      shoesCreateError(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      },

      shoesUpdate(state) {
         state.isLoading = true;
         state.error = '';
      },

      shoesUpdateSuccess(state, action: PayloadAction<IShoes[]>) {
         state.isLoading = false;
         state.error = '';
         state.shoes = action.payload;
      },

      shoesUpdateError(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      },
   },
});

export default shoesSlice.reducer;
